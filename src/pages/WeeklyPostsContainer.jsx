import React from 'react';
import { array, string } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../util/media';

import WeelyPosts from './WeeklyPosts';

let propTypes = {
  __html: string.isRequired,
  pageClass: string.isRequired,
  pageTitle: string.isRequired,
  weeklyPosts: array.isRequired
};

let WeeklyPosts = ({ __html, pageClass, pageTitle, weeklyPosts }) => {
  document.title = `${pageTitle} | Rune Bear`;

  return (
    <StyledWeeklyWrapper>
      <StyledWeeklyPosts
        className={pageClass}
        dangerouslySetInnerHTML={{ __html }}
      />
      <WeelyPosts weeklyPosts={weeklyPosts} />
    </StyledWeeklyWrapper>
  );
};

let StyledWeeklyWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

let StyledWeeklyPosts = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  @media ${mediumUp} {
    max-width: 900px;
  }
`;

WeeklyPosts.propTypes = propTypes;

export default WeeklyPosts;
