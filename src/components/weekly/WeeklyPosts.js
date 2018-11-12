import React from 'react';
import { object } from 'prop-types';

import Pagination from '../Pagination';
import WeeklyPost from './WeeklyPost';
import { setPageIndexes } from '../../util';

const propTypes = {
  route: object.isRequired,
  weekly: object.isRequired
};

const WeeklyPosts = ({ currentPage, changePage, route, weekly }) => {
  setPageIndexes(weekly);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: route.content.rendered }} />
      {weekly[currentPage ? currentPage : 1].map(post => {
        let trimmed = post.content.rendered.substr(0, 345);
        const excerpt = trimmed.substr(
          0,
          Math.min(trimmed.length, trimmed.lastIndexOf(' '))
        );

        return (
          <WeeklyPost
            authors={post._embedded['wp:term'][2]}
            categories={post._embedded['wp:term'][0]}
            changePage={changePage}
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
