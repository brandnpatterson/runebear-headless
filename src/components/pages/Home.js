import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { mediumUp, smallOnly } from '../../util/media';

import page from '../page';

const propTypes = {
  __html: string
};

const Home = ({ __html }) => {
  document.title = 'Rune Bear';

  return (
    <StyledHome>
      <div className="home flex-center" dangerouslySetInnerHTML={{ __html }} />
    </StyledHome>
  );
};

Home.propTypes = propTypes;

export default page(Home);

const StyledHome = styled.div`
  @media ${mediumUp} {
    margin-bottom: 40px;
    margin-top: 40px;
  }

  .images-wrapper p {
    @media ${smallOnly} {
      align-items: center;
      display: flex;
      flex-direction: column;
    }
  }

  .home-subtitle {
    text-align: center;
    width: 300px;
    @media ${mediumUp} {
      width: 450px;
    }
  }
`;
