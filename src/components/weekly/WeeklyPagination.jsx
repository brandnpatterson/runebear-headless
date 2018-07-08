import React, { Component } from 'react';
import { func, number } from 'prop-types';

class WeeklyPagination extends Component {
  static propTypes = {
    getWeeklyPosts: func.isRequired,
    weeklyPage: number.isRequired,
    weeklyTotalPages: number.isRequired
  };

  onPageSelect = event => {
    window.scrollTo(0, 0);

    let dataId = event.target.dataset.id;

    if (event.target.classList.contains('is-current') === false) {
      this.props.getWeeklyPosts(dataId);
      this.props.onSelectWeeklyPage(Number(dataId));
    }
  };

  onNextPage = () => {
    window.scrollTo(0, 0);

    if (this.props.weeklyPage !== this.props.weeklyTotalPages) {
      this.props.onNextWeeklyPage();
    }
  };

  onPreviousPage = () => {
    window.scrollTo(0, 0);

    if (Number(this.props.weeklyPage) !== 1) {
      this.props.onPreviousWeeklyPage();
    }
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
      <div>
        {this.props.weeklyTotalPages >= 2 && (
          <nav className="pagination" aria-label="pagination">
            <PreviousButton />
            <NextButton />
            <ul className="pagination-list">
              <Pagination />
            </ul>
          </nav>
        )}
      </div>
    );
  }
}

export default WeeklyPagination;
