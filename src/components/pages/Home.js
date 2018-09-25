import React from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';

const propTypes = {
  page: object.isRequired
};

const Home = ({ page }) => {
  document.title = 'Rune Bear';

  const __html = page && page.content.rendered;

  return <StyledHome dangerouslySetInnerHTML={{ __html }} />;
};

const StyledHome = styled.div`
  p {
    align-items: center;
    display: flex;
    flex-direction: column;

    @media ${mediumUp} {
      align-items: center;
      display: flex;
      flex-direction: row;
    }
  }

  .home-subtitle {
    display: block;
    margin: 0 auto;
    text-align: center;
    width: 300px;

    @media ${mediumUp} {
      width: 450px;
    }
  }
`;

Home.propTypes = propTypes;

export default Home;
