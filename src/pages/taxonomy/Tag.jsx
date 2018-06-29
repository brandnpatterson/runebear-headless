import React from 'react';
import { array, object } from 'prop-types';
import styled from 'styled-components';
import Taxonomy from './Taxonomy';

let propTypes = {
  match: object.isRequired,
  weeklyPosts: array.isRequired
};

let Tag = ({ match, weeklyPosts }) => {
  window.scrollTo(0, 0);

  let taxonomy = [].concat.apply([], weeklyPosts);
  taxonomy = taxonomy.filter(post => post !== null);

  return (
    <StyledTag>
      <div className="tags-header">
        <h1>
          <strong>{match.params.tagName.toUpperCase()}</strong>
        </h1>
      </div>
      <Taxonomy taxonomy={taxonomy} />
    </StyledTag>
  );
};

let StyledTag = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 100px;
  text-align: left;

  .tags-header {
    display: flex;
    justify-content: center;
  }

  .card-title {
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
  }
`;

Tag.propTypes = propTypes;

export default Tag;
