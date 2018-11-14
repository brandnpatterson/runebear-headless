import React from 'react';
import { func, number, object } from 'prop-types';

import Pagination from '../Pagination';
import WeeklyPost from './WeeklyPost';

const propTypes = {
  changePage: func.isRequired,
  currentPage: number.isRequired,
  weeklyByAuthor: object.isRequired
};

const WeeklyByAuthor = ({ changePage, currentPage, weeklyByAuthor }) => {
  const author = weeklyByAuthor.author[0];
  const links = author.acf.links;

  return (
    <div className="filter-page">
      <header className="filter-header">
        <h1 style={{ textAlign: 'center', marginBottom: '50px' }}>
          <strong>{author.name.toUpperCase()}</strong>
        </h1>
        <div>
          <p>{author.description}</p>
          <p
            className="author-links"
            dangerouslySetInnerHTML={{ __html: links }}
          />
        </div>
      </header>
      {weeklyByAuthor[currentPage].map(post => {
        let trimmed = post.content.rendered.substr(0, 345);
        const excerpt = trimmed.substr(
          0,
          Math.min(trimmed.length, trimmed.lastIndexOf(' '))
        );

        return (
          <WeeklyPost
            categories={post._embedded['wp:term'][0]}
            changePage={changePage}
            content={excerpt}
            key={post.id}
            post={post}
            tags={post._embedded['wp:term'][1]}
          />
        );
      })}
      <Pagination
        changePage={changePage}
        currentPage={currentPage}
        pages={weeklyByAuthor}
      />
    </div>
  );
};

WeeklyByAuthor.propTypes = propTypes;

export default WeeklyByAuthor;
