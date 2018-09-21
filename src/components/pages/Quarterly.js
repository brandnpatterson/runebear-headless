import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';

import page from '../page';

const propTypes = {
  __html: string
};

const Quarterly = ({ __html }) => {
  document.title = 'Quarterly | Rune Bear';

  return (
    <StyledQuarterly
      className="quarterly"
      dangerouslySetInnerHTML={{ __html }}
    />
  );
};

Quarterly.propTypes = propTypes;

export default page(Quarterly);

const StyledQuarterly = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;

  @media ${mediumUp} {
    flex-direction: row;
    margin: 207px auto 0;
    max-width: 800px;
  }

  .speech-bubble-wrapper {
    position: relative;
  }

  .speech-bubble {
    @media ${mediumUp} {
      margin-top: -120px;
    }
  }

  .coming-soon-text {
    left: 50px;
    position: absolute;
    top: 70px;

    @media ${mediumUp} {
      font-size: 30px;
      left: 110px;
      top: 25px;
    }
  }
`;
