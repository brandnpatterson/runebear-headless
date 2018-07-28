import React from 'react';
import { array, object } from 'prop-types';
import styled from 'styled-components';

import FilterByTaxonomy from '../common/FilterByTaxonomy';

let propTypes = {
  match: object.isRequired,
  weeklyByCategory: array.isRequired
};

let WeeklyCategory = ({ match, weeklyByCategory }) => {
  return (
    <StyledWeeklyCategory className="flex-center">
      <div className="categories-header">
        <h1>
          <strong>{match.params.category.toUpperCase()}</strong>
        </h1>
      </div>
      <FilterByTaxonomy taxonomy={weeklyByCategory} />
    </StyledWeeklyCategory>
  );
};

let StyledWeeklyCategory = styled.div`
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

WeeklyCategory.propTypes = propTypes;

export default WeeklyCategory;
