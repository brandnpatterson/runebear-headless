import React from 'react';
import { object } from 'prop-types';
import { associateFilter, firstLetterUpper } from '../../util';

import WeeklyPost from './WeeklyPost';

const propTypes = {
  match: object.isRequired,
  weekly: object.isRequired,
  weeklyByCategory: object.isRequired
};

const WeeklyByCategory = ({ match, weekly, weeklyByCategory }) => {
  const category = match.params.category.replace(/-/g, '').replace(/-/g, '');
  const posts = weeklyByCategory.posts;

  document.title = `${firstLetterUpper(category)} | Rune Bear`;
  window.scrollTo(0, 0);

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

        const authors = associateFilter({
          haystack: weekly.authors,
          needle: [post],
          needleProp: 'post_author'
        });

        return (
          <WeeklyPost
            authors={authors}
            content={excerpt}
            key={post.id}
            post={post}
            readMore={true}
            title={true}
          />
        );
      })}
    </div>
  );
};

WeeklyByCategory.propTypes = propTypes;

export default WeeklyByCategory;
