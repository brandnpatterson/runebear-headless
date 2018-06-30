import React, { Component } from 'react';
import { func, number } from 'prop-types';

let propTypes = {
  getWeeklyPosts: func.isRequired,
  weeklyTotalPages: number.isRequired
};

class WeeklyPagination extends Component {
  state = {
    currentPage: 1
  };

  changePage = page => {
    this.props.getWeeklyPosts(page);
  };

  changePagination = page => {
    this.setState({ currentPage: page });
  };

  render() {
    let { weeklyTotalPages } = this.props;

    let Pagination = () => {
      let pagination = [];

      for (let i = 0; i < weeklyTotalPages; i++) {
        let page = i + 1;
        pagination.push(page);
      }

      console.log(pagination);

      let navigation = pagination.map(page => {
        return (
          <li key={page}>
            <a
              onClick={() => {
                this.changePage(page);
                this.changePagination(page);
              }}
              className={
                'pagination-link' +
                (page === this.state.currentPage ? ' is-current' : '')
              }
              aria-label={`Page ${page}`}
              aria-current="page"
            >
              {page}
            </a>
          </li>
        );
      });

      return navigation;
    };

    let PreviousButton = () => {
      let isDisabled = this.state.currentPage === 1 ? true : false;

      return (
        <a
          className="pagination-previous"
          title="This is the first page"
          disabled={isDisabled}
        >
          Previous
        </a>
      );
    };

    return (
      <nav className="pagination" aria-label="pagination">
        <PreviousButton />
        <a className="pagination-next">Next page</a>
        <ul className="pagination-list">
          <Pagination />
        </ul>
      </nav>
    );
  }
}

WeeklyPagination.propTypes = propTypes;

export default WeeklyPagination;
