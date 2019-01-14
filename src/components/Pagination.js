import React from 'react';
import { array, func, number } from 'prop-types';
import { smallOnly } from '../util/media';
import { ellipses } from '../util';
import styled from 'styled-components';

const propTypes = {
  changePage: func.isRequired,
  currentGroup: array.isRequired,
  currentPage: number.isRequired,
  posts: array.isRequired
};

const Pagination = ({ changePage, currentGroup, currentPage, posts }) => {
  const totalPages = Math.ceil(posts.length / 4);

  const onPageSelect = e => {
    changePage(Number(e.target.textContent));
    window.scrollTo(0, 0);
  };

  const onNextPage = () => {
    let isDisabled = false;

    currentGroup.forEach(group => {
      if (!posts[group]) isDisabled = true;
    });

    if (isDisabled === false) {
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
    let isDisabled = false;

    currentGroup.forEach(group => {
      if (!posts[group]) isDisabled = true;
    });

    return (
      <a className="pagination-next" disabled={isDisabled} onClick={onNextPage}>
        Next page
      </a>
    );
  };

  const PreviousButton = () => {
    let isDisabled = false;

    currentGroup.forEach(group => {
      if (group === 0) isDisabled = true;
    });

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

    for (let i = 1, l = totalPages; i <= l; i++) {
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
    totalPages > 1 && (
      <StyledPagination>
        <nav className="pagination" aria-label="pagination">
          <ul>
            <Pagination />
          </ul>
          <PreviousButton />
          <NextButton />
        </nav>
      </StyledPagination>
    )
  );
};

const StyledPagination = styled.div`
  @media ${smallOnly} {
    margin: 3.125rem auto 0;
  }

  .pagination {
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 3.125rem auto 6.25rem;
  }

  .pagination ul {
    display: flex;
  }

  .cursor-default {
    cursor: default;
  }

  .cursor-default:hover {
    border: 0.0625rem solid #dbdbdb;
  }
`;

Pagination.propTypes = propTypes;

export default Pagination;
