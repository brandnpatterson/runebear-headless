import React from 'react';
import { array, object } from 'prop-types';
import styled from 'styled-components';
import Taxonomy from './Taxonomy';

let propTypes = {
  match: object.isRequired,
  weeklyPosts: array.isRequired
};

let Category = ({ match, weeklyPosts }) => {
  window.scrollTo(0, 0);

  let taxonomy = [].concat.apply([], weeklyPosts);
  taxonomy = taxonomy.filter(post => post !== null);

  return (
    <StyledCategory>
      <div className="categories-header">
        <h1>
          <strong>{match.params.category.toUpperCase()}</strong>
        </h1>
      </div>
      <Taxonomy taxonomy={taxonomy} />
    </StyledCategory>
  );
};

let StyledCategory = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 100px;
  text-align: left;

  .categories-header {
    display: flex;
    justify-content: center;
  }

  .card-title {
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
  }
`;

Category.propTypes = propTypes;

export default Category;
