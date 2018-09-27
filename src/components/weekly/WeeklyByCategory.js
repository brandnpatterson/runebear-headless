import React from 'react';
import { array, object } from 'prop-types';
import { firstUpper } from '../../util';

import WeeklyPost from './WeeklyPost';

const propTypes = {
  match: object.isRequired,
  posts: array.isRequired
};

const WeeklyByCategory = ({ match, posts }) => {
  const category = match.params.category.replace(/-/g, ' ');

  document.title = `${firstUpper(category)} | Rune Bear`;

  return (
    <div className="filter-page">
      <header className="filter-header">
        <h1 style={{ textAlign: 'center' }}>
          <strong>{category.toUpperCase()}</strong>
        </h1>
      </header>
      {posts.map(post => {
        let trimmed = post.content.rendered.substr(0, 345);
        const excerpt = trimmed.substr(
          0,
          Math.min(trimmed.length, trimmed.lastIndexOf(' '))
        );

        return (
          <WeeklyPost
            authors={post._embedded['wp:term'][2]}
            content={excerpt}
            key={post.id}
            post={post}
          />
        );
      })}
    </div>
  );
};

WeeklyByCategory.propTypes = propTypes;

export default WeeklyByCategory;
