import React from 'react';
import { object } from 'prop-types';

import Pagination from '../Pagination';
import WeeklyPost from './WeeklyPost';

const propTypes = {
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
        pages={weeklyByTag}
      />
    </div>
  );
};

WeeklyByTag.propTypes = propTypes;

export default WeeklyByTag;
