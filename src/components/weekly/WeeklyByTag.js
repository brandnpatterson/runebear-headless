import React, { useState } from 'react';
import { object } from 'prop-types';

import WeeklyPost from './WeeklyPost';
import Pagination from '../Pagination';
import { setPageIndexes } from '../../util';

const propTypes = {
  match: object.isRequired,
  weeklyByTag: object.isRequired
};

const WeeklyByTag = ({ match, weeklyByTag }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const tag = match.params.tag.replace(/-/g, ' ');

  setPageIndexes(weeklyByTag);

  const changePage = (newPage = 1) => {
    if (newPage === 'next') {
      setCurrentPage(currentPage + 1);
    } else if (newPage === 'prev') {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(newPage);
    }
  };

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
            categories={post._embedded['wp:term'][0]}
            content={excerpt}
            key={post.id}
            post={post}
            tags={post._embedded['wp:term'][1]}
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
