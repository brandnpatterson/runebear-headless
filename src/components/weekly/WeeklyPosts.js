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

const WeeklyPosts = ({
  currentGroup,
  currentPage,
  changePage,
  route,
  weekly
}) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: route.content.rendered }} />
      {currentGroup.map(index => {
        if (weekly.posts[index]) {
          const post = weekly.posts[index];

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
        posts={weekly.posts}
      />
    </div>
  );
};

WeeklyPosts.propTypes = propTypes;

export default WeeklyPosts;
