import React from 'react';
import { array, object } from 'prop-types';
import styled from 'styled-components';

import FilterByTaxonomy from '../common/FilterByTaxonomy';

let propTypes = {
  match: object.isRequired,
  weeklyByTag: array.isRequired
};

let WeeklyTag = ({ match, weeklyByTag }) => {
  window.scrollTo(0, 0);

  let taxonomy = [].concat.apply([], weeklyByTag);
  taxonomy = taxonomy.filter(post => post !== null);

  return (
    <StyledWeeklyTag className="flex-center">
      <div className="tags-header">
        <h1>
          <strong>{match.params.tagName.toUpperCase()}</strong>
        </h1>
      </div>
      <FilterByTaxonomy taxonomy={taxonomy} />
    </StyledWeeklyTag>
  );
};

let StyledWeeklyTag = styled.div`
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

WeeklyTag.propTypes = propTypes;

export default WeeklyTag;
