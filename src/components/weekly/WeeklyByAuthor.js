import React from 'react';
import { object } from 'prop-types';
import { firstLetterUpper } from '../../util';

import WeeklyPost from './WeeklyPost';

const propTypes = {
  weekly: object,
  weeklyByAuthor: object
};

const WeeklyByAuthor = ({ weeklyByAuthor }) => {
  const author = weeklyByAuthor.author[0];
  const posts = weeklyByAuthor.posts;
  const authorLinkList = {
    66: 'http://www.andreablythe.com',
    67: 'http://www.lauramadelinewiseman.com'
  };

  document.title = `${firstLetterUpper(author.name)} | Rune Bear`;

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

        const categories = post._embedded['wp:term'][0];
        const tags = post._embedded['wp:term'][1];

        return (
          <WeeklyPost
            categories={categories}
            content={excerpt}
            key={post.id}
            post={post}
            tags={tags}
          />
        );
      })}
    </div>
  );
};

WeeklyByAuthor.propTypes = propTypes;

export default WeeklyByAuthor;
