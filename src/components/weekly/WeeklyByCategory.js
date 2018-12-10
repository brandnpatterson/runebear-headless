import React from 'react';
import { array, func, number, object } from 'prop-types';
import Pagination from '../Pagination';
import WeeklyPost from './WeeklyPost';

const propTypes = {
  changePage: func.isRequired,
  currentGroup: array.isRequired,
  currentPage: number.isRequired,
  match: object.isRequired,
  weeklyByCategory: object.isRequired
};

const WeeklyByCategory = ({
  changePage,
  currentGroup,
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
      {currentGroup.map(index => {
        if (weeklyByCategory.posts[index]) {
          const post = weeklyByCategory.posts[index];

          return (
            <WeeklyPost
              authors={post._embedded && post._embedded['wp:term'][2]}
              categories={post._embedded && post._embedded['wp:term'][0]}
              changePage={changePage}
              content={post.excerpt.rendered}
              key={post.id}
              post={post}
              tags={post._embedded && post._embedded['wp:term'][1]}
            />
          );
        } else return null;
      })}
      <Pagination
        changePage={changePage}
        currentGroup={currentGroup}
        currentPage={currentPage}
        posts={weeklyByCategory.posts}
      />
    </div>
  );
};

WeeklyByCategory.propTypes = propTypes;

export default WeeklyByCategory;
