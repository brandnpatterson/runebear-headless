import React from 'react';
import { func, number, object } from 'prop-types';
import Pagination from '../Pagination';
import WeeklyPost from './WeeklyPost';

const propTypes = {
  changePage: func.isRequired,
  currentPage: number.isRequired,
  route: object.isRequired,
  weekly: object.isRequired
};

const WeeklyPosts = ({ currentPage, changePage, route, weekly }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: route.content.rendered }} />
      {weekly[currentPage ? currentPage : 1].map(post => {
        return (
          <WeeklyPost
            authors={post._embedded['wp:term'][2]}
            categories={post._embedded['wp:term'][0]}
            changePage={changePage}
            content={post.excerpt.rendered}
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
