import React from 'react';
import { object } from 'prop-types';
import { associateFilter, firstLetterUpper } from '../../util';

import WeeklyPost from './WeeklyPost';

const propTypes = {
  match: object.isRequired,
  weekly: object.isRequired,
  weeklyByTag: object.isRequired
};

const WeeklyByTag = ({ match, weekly, weeklyByTag }) => {
  const tag = match.params.tag.replace(/-/g, '').replace(/-/g, '');
  const posts = weeklyByTag.posts;

  document.title = `${firstLetterUpper(tag)} | Rune Bear`;
  window.scrollTo(0, 0);

  return (
    <div className="filter-page">
      <header className="filter-header">
        <h1 style={{ textAlign: 'center' }}>
          <strong>{tag.toUpperCase()}</strong>
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

WeeklyByTag.propTypes = propTypes;

export default WeeklyByTag;
