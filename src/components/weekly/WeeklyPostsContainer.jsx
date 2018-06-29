import React from 'react';
import { array, string } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';
import WeeklyPosts from './WeeklyPosts';

let propTypes = {
  __html: string.isRequired,
  pageClass: string.isRequired,
  pageTitle: string.isRequired,
  weeklyPosts: array.isRequired
};

let WeeklyPostsContainer = ({
  __html,
  pageClass,
  pageTitle,
  weeklyPosts,
  weeklyRequestMade
}) => {
  document.title = `${pageTitle} | Rune Bear`;

  let waitForPosts = () => {
    if (weeklyRequestMade) {
      return (
        <div>
          <StyledWeeklyPosts
            className={pageClass}
            dangerouslySetInnerHTML={{ __html }}
          />
          {weeklyPosts && <WeeklyPosts weeklyPosts={weeklyPosts} />}
        </div>
      );
    } else {
      let style = {
        marginTop: '250px',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center'
      };

      return (
        <div style={style} className="loading">
          <h2>Loading...</h2>
        </div>
      );
    }
  };
  return <StyledWeeklyWrapper>{waitForPosts()}</StyledWeeklyWrapper>;
};

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

WeeklyPostsContainer.propTypes = propTypes;

export default WeeklyPostsContainer;
