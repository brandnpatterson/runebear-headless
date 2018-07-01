import React from 'react';
import { array, func, number, string } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';

import WeeklyPosts from './WeeklyPosts';
import WeeklyPagination from './WeeklyPagination';

let propTypes = {
  __html: string.isRequired,
  getWeeklyPosts: func.isRequired,
  onNextWeeklyPage: func.isRequired,
  onPreviousWeeklyPage: func.isRequired,
  onSelectWeeklyPage: func.isRequired,
  pageClass: string.isRequired,
  pageTitle: string.isRequired,
  weeklyPage: number.isRequired,
  weeklyPosts: array.isRequired,
  weeklyTotalPages: number.isRequired
};

class WeeklyPostsPage extends React.Component {
  render() {
    let { __html, weeklyPosts } = this.props;

    document.title = `${this.props.pageTitle} | Rune Bear`;

    return (
      <StyledWeeklyWrapper>
        <StyledWeeklyPosts
          className={this.props.pageClass}
          dangerouslySetInnerHTML={{ __html }}
        />
        {weeklyPosts && <WeeklyPosts weeklyPosts={weeklyPosts} />}
        <WeeklyPagination
          onNextWeeklyPage={this.props.onNextWeeklyPage}
          onPreviousWeeklyPage={this.props.onPreviousWeeklyPage}
          onSelectWeeklyPage={this.props.onSelectWeeklyPage}
          getWeeklyPosts={this.props.getWeeklyPosts}
          weeklyPage={this.props.weeklyPage}
          weeklyTotalPages={this.props.weeklyTotalPages}
        />
      </StyledWeeklyWrapper>
    );
  }
}

let StyledWeeklyWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

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
