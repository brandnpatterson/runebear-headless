import React from 'react';
import { func, number, object } from 'prop-types';
import Pagination from '../Pagination';
import WeeklyPost from './WeeklyPost';

const propTypes = {
  changePage: func.isRequired,
  currentPage: number.isRequired,
  match: object.isRequired,
  weeklyByTag: object.isRequired
};

const WeeklyByTag = ({ changePage, currentPage, match, weeklyByTag }) => {
  const tag = match.params.tag.replace(/-/g, ' ');

  return (
    <div className="filter-page">
      <header className="filter-header">
        <h1 style={{ textAlign: 'center' }}>
          <strong>{tag.toUpperCase()}</strong>
        </h1>
      </header>
      {weeklyByTag[currentPage].map(post => {
        return (
          <WeeklyPost
            authors={post._embedded['wp:term'][2]}
            changePage={changePage}
            content={post.excerpt.rendered}
            key={post.id}
            post={post}
          />
        );
      })}
      <Pagination
        changePage={changePage}
        currentPage={currentPage}
        pages={weeklyByTag}
      />
    </div>
  );
};

WeeklyByTag.propTypes = propTypes;

export default WeeklyByTag;
