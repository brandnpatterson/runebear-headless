import React, { Component } from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { changeWeeklyPage } from '../../actions';

class WeeklyPagination extends Component {
  static propTypes = {
    changeWeeklyPage: func.isRequired,
    weekly: object
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
    let nextPage = this.props.weekly.pageNumber + 1;

    if (nextPage <= this.props.weekly.totalPages) {
      this.props.changeWeeklyPage(null, 'next');

      window.scrollTo(0, 0);
    }
  };

  onPreviousPage = () => {
    let prevPage = this.props.weekly.pageNumber - 1;

    if (prevPage !== 0) {
      this.props.changeWeeklyPage(null, 'prev');

      window.scrollTo(0, 0);
    }
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
          disabled={isDisabled}
          onClick={this.onNextPage}
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
              style={
                page === Number(this.props.weekly.pageNumber)
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
      <div>
        {this.props.weekly.totalPages >= 2 && (
          <nav className="pagination" aria-label="pagination">
            <ul className="pagination-list">
              <Pagination />
            </ul>
            <PreviousButton />
            <NextButton />
          </nav>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  weekly: state.weekly
});

const mapDispatchToProps = { changeWeeklyPage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WeeklyPagination);
