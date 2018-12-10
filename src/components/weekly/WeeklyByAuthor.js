import React from 'react';
import { array, func, number, object } from 'prop-types';
import Pagination from '../Pagination';
import WeeklyPost from './WeeklyPost';

const propTypes = {
  changePage: func.isRequired,
  currentGroup: array.isRequired,
  currentPage: number.isRequired,
  weeklyByAuthor: object.isRequired
};

const WeeklyByAuthor = ({
  changePage,
  currentGroup,
  currentPage,
  weeklyByAuthor
}) => {
  const author = weeklyByAuthor.fromState[0];
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
      {currentGroup.map(index => {
        if (weeklyByAuthor.posts[index]) {
          const post = weeklyByAuthor.posts[index];

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
        posts={weeklyByAuthor.posts}
      />
    </div>
  );
};

WeeklyByAuthor.propTypes = propTypes;

export default WeeklyByAuthor;
