import React from 'react';
import { func, number, object } from 'prop-types';
import { smallOnly } from '../../util/media';
import { pagination } from '../../util';
import styled from 'styled-components';

const propTypes = {
  changeWeeklyPage: func.isRequired,
  weekly: object.isRequired,
  weeklyPage: number.isRequired
};

const WeeklyPagination = ({ changeWeeklyPage, weekly, weeklyPage }) => {
  const onPageSelect = e => {
    const targetValue = e.target.textContent;
    if (weekly[targetValue]) {
      changeWeeklyPage(Number(e.target.textContent));
    } else {
      changeWeeklyPage(Number(e.target.textContent));
    }
    window.scrollTo(0, 0);
  };

  const onNextPage = () => {
    let nextPage = weeklyPage + 1;
    if (nextPage <= weekly.totalPages) {
      changeWeeklyPage('next');
      window.scrollTo(0, 0);
    }
  };

  const onPreviousPage = () => {
    let prevPage = weeklyPage - 1;
    if (prevPage !== 0) {
      changeWeeklyPage('prev');
      window.scrollTo(0, 0);
    }
  };

  const NextButton = () => {
    const isDisabled = weeklyPage === weekly.totalPages ? true : false;

    return (
      <a className="pagination-next" disabled={isDisabled} onClick={onNextPage}>
        Next page
      </a>
    );
  };

  const PreviousButton = () => {
    const isDisabled = weeklyPage === 1 ? true : false;

    return (
      <a
        className="pagination-previous"
        disabled={isDisabled}
        onClick={onPreviousPage}
      >
        Previous
      </a>
    );
  };

  const Pagination = () => {
    let pages = [];

    for (let i = 1, l = weekly.totalPages; i <= l; i++) {
      pages.push(pagination(i, l));
    }

    return pages[weeklyPage - 1].map((page, index) => {
      return (
        <li key={page !== '...' ? page : `${index}-index`}>
          <a
            className={
              'pagination-link ' +
              (page === weeklyPage ? 'is-current' : '') +
              (page === '...' ? 'cursor-default' : '')
            }
            style={page === weeklyPage ? { pointerEvents: 'none' } : null}
            aria-label={`Page ${page}`}
            aria-current="page"
            onClick={page === '...' ? null : onPageSelect}
            data-id={page}
          >
            {page}
          </a>
        </li>
      );
    });
  };

  return (
    <StyledPagination>
      {weekly.totalPages >= 1 && (
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
};

const StyledPagination = styled.div`
  @media ${smallOnly} {
    margin: 50px auto 0;
  }

  .cursor-default {
    cursor: default;
  }

  .cursor-default:hover {
    border: 1px solid #dbdbdb;
  }
`;

WeeklyPagination.propTypes = propTypes;

export default WeeklyPagination;
