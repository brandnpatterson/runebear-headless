import React from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';

const propTypes = {
  page: object.isRequired
};

const Home = ({ page }) => {
  return (
    <StyledHome dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
  );
};

const StyledHome = styled.div`
  margin-bottom: 50px;

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

  .images-wrapper {
    margin: 0 auto 20px;

    @media ${mediumUp} {
      margin-top: 20px;
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
