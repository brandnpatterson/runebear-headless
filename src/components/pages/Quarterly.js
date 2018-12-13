import React from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';

const propTypes = {
  route: object.isRequired
};

const Quarterly = ({ route }) => {
  return (
    <StyledQuarterly
      dangerouslySetInnerHTML={{ __html: route.content.rendered }}
    />
  );
};

const StyledQuarterly = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;

  @media ${mediumUp} {
    flex-direction: row;
    margin: 8rem auto 0;
    max-width: 50rem;
  }

  .speech-bubble-wrapper {
    position: relative;
  }

  .speech-bubble {
    @media ${mediumUp} {
      margin-top: -7.5rem;
    }
  }

  .coming-soon-text {
    left: 3.125rem;
    position: absolute;
    top: 4.375rem;

    @media ${mediumUp} {
      font-size: 1.875rem;
      left: 6.875rem;
      top: 1.563rem;
    }
  }
`;

Quarterly.propTypes = propTypes;

export default Quarterly;
