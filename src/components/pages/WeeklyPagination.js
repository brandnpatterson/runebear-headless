import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeWeeklyPage } from '../../actions';
import styled from 'styled-components';

class WeeklyPagination extends Component {
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
    this.props.changeWeeklyPage(null, 'next');

    window.scrollTo(0, 0);
  };

  onPreviousPage = () => {
    this.props.changeWeeklyPage(null, 'prev');

    window.scrollTo(0, 0);
  };

  render() {
    const NextButton = () => {
      const isDisabled =
        this.props.weekly.pageNumber === this.props.weekly.totalPages
          ? true
          : false;

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

    const PreviousButton = () => {
      const isDisabled =
        Number(this.props.weekly.pageNumber) === 1 ? true : false;

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

    const Pagination = () => {
      const listItems = [];

      for (var i = 0; i < this.props.weekly.totalPages; i++) {
        const page = i + 1;

        listItems.push(
          <li key={page}>
            <a
              className={
                'pagination-link' +
                (page === Number(this.props.weekly.pageNumber)
                  ? ' is-current'
                  : '')
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
        {this.props.weekly.totalPages >= 2 && (
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

const mapStateToProps = state => ({
  weekly: state.weekly
});

export default connect(
  mapStateToProps,
  { changeWeeklyPage }
)(WeeklyPagination);

const StyledPagination = styled.div`
  .is-current {
    pointer-events: none;
  }
`;
