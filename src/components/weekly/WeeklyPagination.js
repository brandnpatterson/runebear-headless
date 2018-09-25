import React, { Component } from 'react';
import { func, number, object } from 'prop-types';
import { smallOnly } from '../../util/media';
import styled from 'styled-components';

class WeeklyPagination extends Component {
  static propTypes = {
    changeWeeklyPage: func.isRequired,
    weekly: object.isRequired,
    weeklyPage: number.isRequired
  };

  onPageSelect = e => {
    const { weekly } = this.props;
    const targetValue = e.target.textContent;
    if (weekly[targetValue]) {
      this.props.changeWeeklyPage(Number(e.target.textContent));
    } else {
      this.props.fetchWeeklyPage(Number(e.target.textContent));
    }
    window.scrollTo(0, 0);
  };

  onNextPage = () => {
    let nextPage = this.props.weeklyPage + 1;
    if (nextPage <= this.props.weekly.totalPages) {
      this.props.changeWeeklyPage('next');
      window.scrollTo(0, 0);
    }
  };

  onPreviousPage = () => {
    let prevPage = this.props.weeklyPage - 1;
    if (prevPage !== 0) {
      this.props.changeWeeklyPage('prev');
      window.scrollTo(0, 0);
    }
  };

  render() {
    const NextButton = () => {
      const isDisabled =
        this.props.weeklyPage === this.props.weekly.totalPages ? true : false;

      return (
        <a
          className="pagination-next"
          disabled={isDisabled}
          onClick={this.onNextPage}
        >
          Next page
        </a>
      );
    };

    const PreviousButton = () => {
      const isDisabled = Number(this.props.weeklyPage) === 1 ? true : false;

      return (
        <a
          className="pagination-previous"
          disabled={isDisabled}
          onClick={this.onPreviousPage}
        >
          Previous
        </a>
      );
    };

    const Pagination = () => {
      const listItems = [];

      for (var i = 0; i < this.props.weekly.totalPages; i++) {
        const page = i + 1;

        listItems.push(
          <li key={page}>
            <a
              className={
                'pagination-link' +
                (page === Number(this.props.weeklyPage) ? ' is-current' : '')
              }
              style={
                page === Number(this.props.weeklyPage)
                  ? { pointerEvents: 'none' }
                  : null
              }
              aria-label={`Page ${page}`}
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
        {this.props.weekly.totalPages >= 2 && (
          <nav className="pagination" aria-label="pagination">
            <ul>
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

const StyledPagination = styled.div`
  @media ${smallOnly} {
    margin: 50px auto 0;
  }
`;

export default WeeklyPagination;
