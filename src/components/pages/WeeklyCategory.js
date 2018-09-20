import React from 'react';
import { array, object } from 'prop-types';
import styled from 'styled-components';

import FilterByTaxonomy from '../common/FilterByTaxonomy';

class WeeklyCategory extends React.Component {
  static propTypes = {
    match: object.isRequired,
    weeklyByCategory: array.isRequired
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { match, weeklyByCategory } = this.props;
    return (
      <StyledWeeklyCategory className="flex-center">
        <div className="categories-header">
          <h1>
            <strong>{match.params.category.toUpperCase()}</strong>
          </h1>
        </div>
        {/* <FilterByTaxonomy taxonomy={weeklyByCategory} /> */}
      </StyledWeeklyCategory>
    );
  }
}

const StyledWeeklyCategory = styled.div`
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

export default WeeklyCategory;
