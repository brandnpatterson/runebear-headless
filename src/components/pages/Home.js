import React from 'react';
import { array } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';

const propTypes = {
  pages: array.isRequired
};

const Home = ({ pages }) => {
  const page = pages.filter(p => p.slug === 'home')[0];

  return (
    <StyledHome
      dangerouslySetInnerHTML={{ __html: page && page.content.rendered }}
    />
  );
};

const StyledHome = styled.div`
  margin-bottom: 3.125rem;

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
    margin: 0 auto 1.25rem;

    @media ${mediumUp} {
      margin-top: 1.25rem;
    }
  }

  .home-subtitle {
    display: block;
    margin: 0 auto;
    text-align: center;
    width: 18.75rem;

    @media ${mediumUp} {
      width: 28.13rem;
    }
  }
`;

Home.propTypes = propTypes;

export default Home;
