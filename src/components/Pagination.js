import React from 'react';
import { func, number, object } from 'prop-types';
import { smallOnly } from '../util/media';
import { ellipses } from '../util';
import styled from 'styled-components';

const propTypes = {
  currentPage: number.isRequired,
  changePage: func.isRequired,
  pages: object.isRequired
};

const Pagination = ({ changePage, pages, currentPage }) => {
  const onPageSelect = e => {
    const targetValue = e.target.textContent;
    if (pages[targetValue]) {
      changePage(Number(e.target.textContent));
    } else {
      changePage(Number(e.target.textContent));
    }
    window.scrollTo(0, 0);
  };

  const onNextPage = () => {
    let nextPage = currentPage + 1;
    if (nextPage <= pages.totalPages) {
      changePage('next');
      window.scrollTo(0, 0);
    }
  };

  const onPreviousPage = () => {
    let prevPage = currentPage - 1;
    if (prevPage !== 0) {
      changePage('prev');
      window.scrollTo(0, 0);
    }
  };

  const NextButton = () => {
    const isDisabled = currentPage === pages.totalPages ? true : false;

    return (
      <a className="pagination-next" disabled={isDisabled} onClick={onNextPage}>
        Next page
      </a>
    );
  };

  const PreviousButton = () => {
    const isDisabled = currentPage === 1 ? true : false;

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
    let allPages = [];

    for (let i = 1, l = pages.totalPages; i <= l; i++) {
      allPages.push(ellipses(i, l));
    }

    return allPages[currentPage - 1].map((page, index) => {
      return (
        <li key={page !== '...' ? page : `${index}-index`}>
          <a
            className={
              'pagination-link ' +
              (page === currentPage ? 'is-current' : '') +
              (page === '...' ? 'cursor-default' : '')
            }
            style={page === currentPage ? { pointerEvents: 'none' } : null}
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
      {pages.totalPages > 1 && (
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

Pagination.propTypes = propTypes;

export default Pagination;
