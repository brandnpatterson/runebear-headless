import React from 'react';
import { number, object } from 'prop-types';

import WeeklyPost from './WeeklyPost';

const propTypes = {
  page: object.isRequired,
  weekly: object.isRequired,
  weeklyPage: number.isRequired
};

const WeeklyPosts = ({ page, weekly, weeklyPage }) => {
  const __html = page.content.rendered;

  document.title = 'Weekly | Rune Bear';
  window.scrollTo(0, 0);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html }} />
      {weekly[weeklyPage].map(post => {
        let trimmed = post.content.rendered.substr(0, 345);
        const excerpt = trimmed.substr(
          0,
          Math.min(trimmed.length, trimmed.lastIndexOf(' '))
        );

        const categories = post._embedded['wp:term'][0];
        const tags = post._embedded['wp:term'][1];
        const authors = post._embedded['wp:term'][2];

        return (
          <WeeklyPost
            authors={authors}
            categories={categories}
            content={excerpt}
            key={post.id}
            post={post}
            readMore={true}
            tags={tags}
            title={true}
          />
        );
      })}
    </div>
  );
};

WeeklyPosts.propTypes = propTypes;

export default WeeklyPosts;
