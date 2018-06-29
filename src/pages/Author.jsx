import React from 'react';
import { array } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../util/media';

import WeeklyPosts from './WeeklyPosts';

let propTypes = {
  weeklyPosts: array.isRequired
};

let FilterByAuthor = ({ weeklyPosts }) => {
  window.scrollTo(0, 0);

  weeklyPosts = weeklyPosts.filter(post => post !== null);
  let post = weeklyPosts[0];

  return (
    <StyledAuthor>
      {post &&
        post.author &&
        post.authorDesc && (
          <div>
            <h1 className="card-title">{post.author}</h1>
            <p className="card-author-description">{post.authorDesc}</p>
          </div>
        )}
      <WeeklyPosts weeklyPosts={weeklyPosts} author={false} />
    </StyledAuthor>
  );
};

let StyledAuthor = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 100px;
  min-height: 670px;
  text-align: left;

  .authors-header {
    display: flex;
    justify-content: center;
  }

  .authors-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 200px;
  }

  .card-title {
    font-weight: bold;
    margin-bottom: 50px;
    text-align: center;
    text-transform: uppercase;
  }

  .card-author-description {
    margin: 0 auto;
    max-width: 90%;

    @media ${mediumUp} {
      width: 775px;
    }
  }
`;

FilterByAuthor.propTypes = propTypes;

export default FilterByAuthor;
