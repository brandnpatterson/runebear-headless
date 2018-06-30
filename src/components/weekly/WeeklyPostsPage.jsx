import React from 'react';
import { array, func, number, string } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';
import WeeklyPosts from './WeeklyPosts';
import WeeklyPagination from './WeeklyPagination';

let propTypes = {
  __html: string.isRequired,
  getWeeklyPosts: func.isRequired,
  pageClass: string.isRequired,
  pageTitle: string.isRequired,
  weeklyPosts: array.isRequired,
  weeklyTotalPages: number.isRequired
};

class WeeklyPostsPage extends React.Component {
  render() {
    let {
      __html,
      getWeeklyPosts,
      pageClass,
      pageTitle,
      weeklyPosts,
      weeklyTotalPages
    } = this.props;

    document.title = `${pageTitle} | Rune Bear`;

    return (
      <StyledWeeklyWrapper>
        <StyledWeeklyPosts
          className={pageClass}
          dangerouslySetInnerHTML={{ __html }}
        />
        {weeklyPosts && <WeeklyPosts weeklyPosts={weeklyPosts} />}
        <WeeklyPagination
          getWeeklyPosts={getWeeklyPosts}
          weeklyTotalPages={weeklyTotalPages}
        />
      </StyledWeeklyWrapper>
    );
  }
}

let StyledWeeklyWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  .card-tags {
    display: flex;
  }
`;

let StyledWeeklyPosts = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  @media ${mediumUp} {
    max-width: 900px;
  }
`;

WeeklyPostsPage.propTypes = propTypes;

export default WeeklyPostsPage;
