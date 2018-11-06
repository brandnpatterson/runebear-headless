import React, { useState } from 'react';
import { object } from 'prop-types';

import WeeklyPost from './WeeklyPost';
import Pagination from '../Pagination';
import { setPageIndexes } from '../../util';

const propTypes = {
  route: object.isRequired,
  weekly: object.isRequired
};

const WeeklyPosts = ({ route, weekly }) => {
  const [currentPage, setCurrentPage] = useState(1);

  setPageIndexes(weekly);

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
    <div>
      <div dangerouslySetInnerHTML={{ __html: route.content.rendered }} />
      {weekly[currentPage].map(post => {
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
        pages={weekly}
      />
    </div>
  );
};

WeeklyPosts.propTypes = propTypes;

export default WeeklyPosts;
