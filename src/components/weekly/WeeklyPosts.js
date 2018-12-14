import React from 'react';
import { array, func, number } from 'prop-types';
import Pagination from '../Pagination';
import WeeklyPost from './WeeklyPost';

const propTypes = {
  changePage: func.isRequired,
  currentPage: number.isRequired,
  pages: array.isRequired,
  posts: array.isRequired
};

const WeeklyPosts = ({
  currentGroup,
  currentPage,
  changePage,
  pages,
  posts
}) => {
  const page = pages.filter(p => p.slug === 'weekly')[0];

  return (
    <div>
      <div
        dangerouslySetInnerHTML={{ __html: page && page.content.rendered }}
      />
      {currentGroup.map(index => {
        if (posts[index]) {
          const post = posts[index];

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
        posts={posts}
      />
    </div>
  );
};

WeeklyPosts.propTypes = propTypes;

export default WeeklyPosts;
