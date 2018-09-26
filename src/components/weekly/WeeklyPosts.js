import React from 'react';
import { number, object } from 'prop-types';

import WeeklyPost from './WeeklyPost';

const propTypes = {
  page: object.isRequired,
  weekly: object.isRequired,
  weeklyPage: number.isRequired
};

const WeeklyPosts = ({ page, weekly, weeklyPage }) => {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      {weekly[weeklyPage].map(post => {
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
    </div>
  );
};

WeeklyPosts.propTypes = propTypes;

export default WeeklyPosts;
