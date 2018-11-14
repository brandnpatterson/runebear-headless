import React from 'react';
import { func, number, object } from 'prop-types';

import Pagination from '../Pagination';
import WeeklyPost from './WeeklyPost';

const propTypes = {
  changePage: func.isRequired,
  currentPage: number.isRequired,
  match: object.isRequired,
  weeklyByCategory: object.isRequired
};

const WeeklyByCategory = ({
  changePage,
  currentPage,
  match,
  weeklyByCategory
}) => {
  const category = match.params.category.replace(/-/g, ' ');

  return (
    <div className="filter-page">
      <header className="filter-header">
        <h1 style={{ textAlign: 'center' }}>
          <strong>{category.toUpperCase()}</strong>
        </h1>
      </header>
      {weeklyByCategory[currentPage].map(post => {
        let trimmed = post.content.rendered.substr(0, 345);
        const excerpt = trimmed.substr(
          0,
          Math.min(trimmed.length, trimmed.lastIndexOf(' '))
        );

        return (
          <WeeklyPost
            authors={post._embedded['wp:term'][2]}
            changePage={changePage}
            content={excerpt}
            key={post.id}
            post={post}
          />
        );
      })}
      <Pagination
        changePage={changePage}
        currentPage={currentPage}
        pages={weeklyByCategory}
      />
    </div>
  );
};

WeeklyByCategory.propTypes = propTypes;

export default WeeklyByCategory;
