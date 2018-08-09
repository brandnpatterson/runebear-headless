import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { mediumUp, smallOnly } from '../../util/media';

let propTypes = {
  __html: string.isRequired,
  pageClass: string.isRequired,
  pageTitle: string.isRequired
};

let Home = ({ __html, pageClass, pageTitle }) => {
  document.title = `${pageTitle} | Rune Bear`;

  return (
    <StyledHome
      className={`${pageClass} flex-center`}
      dangerouslySetInnerHTML={{ __html }}
    />
  );
};

let StyledHome = styled.div`
  margin-top: -100px;

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

Home.propTypes = propTypes;

export default Home;
