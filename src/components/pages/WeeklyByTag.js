import React from 'react';
import { array, func, number, object } from 'prop-types';
import Pagination from '../Pagination';
import WeeklyPost from '../WeeklyPost';

const propTypes = {
  changePage: func.isRequired,
  currentGroup: array.isRequired,
  currentPage: number.isRequired,
  match: object.isRequired,
  weeklyByTag: object.isRequired
};

const WeeklyByTag = ({
  changePage,
  currentGroup,
  currentPage,
  match,
  weeklyByTag
}) => {
  const tag = match.params.tag.replace(/-/g, ' ');

  return (
    <div className="filter-page">
      <header className="filter-header">
        <h1 style={{ textAlign: 'center' }}>
          <strong>{tag.toUpperCase()}</strong>
        </h1>
      </header>
      {currentGroup.map(index => {
        if (weeklyByTag.posts[index]) {
          const post = weeklyByTag.posts[index];

          return (
            <WeeklyPost
              authors={post._embedded && post._embedded['wp:term'][2]}
              changePage={changePage}
              content={post.excerpt.rendered}
              key={post.id}
              post={post}
            />
          );
        } else return null;
      })}
      <Pagination
        changePage={changePage}
        currentGroup={currentGroup}
        currentPage={currentPage}
        posts={weeklyByTag.posts}
      />
    </div>
  );
};

WeeklyByTag.propTypes = propTypes;

export default WeeklyByTag;
