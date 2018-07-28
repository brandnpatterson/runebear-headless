import React, { Component } from 'react';
import { func, number } from 'prop-types';
import styled from 'styled-components';

class WeeklyPagination extends Component {
  static propTypes = {
    onSelectWeeklyPage: func.isRequired,
    weeklyPage: number.isRequired,
    weeklyTotalPages: number.isRequired
  };

  onPageSelect = event => {
    let dataId = Number(event.target.dataset.id);

    this.props.onSelectWeeklyPage(dataId);
  };

  onNextPage = () => {
    this.props.onNextWeeklyPage();
  };

  onPreviousPage = () => {
    this.props.onPreviousWeeklyPage();
  };

  render() {
    let NextButton = () => {
      let isDisabled =
        this.props.weeklyPage === this.props.weeklyTotalPages ? true : false;

      return (
        <a
          className="pagination-next"
          onClick={this.onNextPage}
          disabled={isDisabled}
        >
          Next page
        </a>
      );
    };

    let PreviousButton = () => {
      let isDisabled = Number(this.props.weeklyPage) === 1 ? true : false;

      return (
        <a
          className="pagination-previous"
          title="This is the first page"
          disabled={isDisabled}
          onClick={this.onPreviousPage}
        >
          Previous
        </a>
      );
    };

    let Pagination = () => {
      let listItems = [];

      for (var i = 0; i < this.props.weeklyTotalPages; i++) {
        let page = i + 1;

        listItems.push(
          <li key={page}>
            <a
              className={
                'pagination-link' +
                (page === Number(this.props.weeklyPage) ? ' is-current' : '')
              }
              aria-label="Page 1"
              aria-current="page"
              onClick={this.onPageSelect}
              data-id={page}
            >
              {page}
            </a>
          </li>
        );
      }

      return listItems;
    };

    return (
      <StyledPagination>
        {this.props.weeklyTotalPages >= 2 && (
          <nav className="pagination" aria-label="pagination">
            <ul className="pagination-list">
              <Pagination />
            </ul>
            <PreviousButton />
            <NextButton />
          </nav>
        )}
      </StyledPagination>
    );
  }
}

let StyledPagination = styled.div`
  .is-current {
    pointer-events: none;
  }
`;

export default WeeklyPagination;
