import React from 'react';
import { object } from 'prop-types';
import { associateFilter, firstLetterUpper } from '../../util';

import WeeklyPost from './WeeklyPost';

const propTypes = {
  weekly: object,
  weeklyByAuthor: object
};

const WeeklyByAuthor = ({ weekly, weeklyByAuthor }) => {
  const author = weeklyByAuthor.author[0];
  const posts = weeklyByAuthor.posts;
  const authorLinkList = {
    66: 'http://www.andreablythe.com',
    67: 'http://www.lauramadelinewiseman.com'
  };

  document.title = `${firstLetterUpper(author.name)} | Rune Bear`;
  window.scrollTo(0, 0);

  const authorLinks = (author, secondAuthor) => {
    return (
      <p className="author-links">
        Learn more at{' '}
        <a href={author} target="_blank" rel="noopener noreferrer">
          {author}{' '}
        </a>
        {secondAuthor && (
          <span>
            and{' '}
            <a href={secondAuthor} target="_blank" rel="noopener noreferrer">
              {secondAuthor}{' '}
            </a>
          </span>
        )}
      </p>
    );
  };

  return (
    <div className="filter-page">
      <header className="filter-header">
        <h1 style={{ textAlign: 'center', marginBottom: '50px' }}>
          <strong>{author.name.toUpperCase()}</strong>
        </h1>
        <div>
          <p>{author.description}</p>
          {author.id === 66 &&
            authorLinks(authorLinkList[66], authorLinkList[67])}
          {author.id === 67 &&
            authorLinks(authorLinkList[66], authorLinkList[67])}
        </div>
      </header>
      {posts.map(post => {
        let trimmed = post.content.rendered.substr(0, 345);
        const excerpt = trimmed.substr(
          0,
          Math.min(trimmed.length, trimmed.lastIndexOf(' '))
        );

        const categories = associateFilter({
          haystack: weekly.categories,
          needle: [post],
          needleProp: 'categories'
        });

        const tags = associateFilter({
          haystack: weekly.tags,
          needle: [post],
          needleProp: 'tags'
        });

        return (
          <WeeklyPost
            categories={categories}
            content={excerpt}
            key={post.id}
            post={post}
            tags={tags}
            readMore={true}
            title={true}
          />
        );
      })}
    </div>
  );
};

WeeklyByAuthor.propTypes = propTypes;

export default WeeklyByAuthor;
