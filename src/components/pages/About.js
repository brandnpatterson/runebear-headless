import React from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';
import { black, gray } from '../../util/color';
import { mediumUp } from '../../util/media';

const propTypes = {
  route: object.isRequired
};

const About = ({ route }) => {
  return (
    <StyledAbout dangerouslySetInnerHTML={{ __html: route.content.rendered }} />
  );
};

const StyledAbout = styled.div`
  margin-bottom: 6.25rem;

  .container {
    margin: 3.125rem auto;
    max-width: 59.38rem;
    padding: 1.875rem 3.125rem 3.125rem;
    width: 100%;

    @media ${mediumUp} {
      border: 0.0625rem solid ${gray};
    }

    @media ${mediumUp} {
      display: flex;
      justify-content: space-around;
      width: 68.75rem;
    }
  }

  .container p {
    @media ${mediumUp} {
      padding-top: 0.625rem;
    }
  }

  .content-inner h1 {
    font-size: 1.625rem;
    margin-bottom: 0;
  }

  .content-inner h2 {
    font-size: 1.25rem;
    margin-bottom: 1.875rem;
  }

  .content-inner h1,
  .content-inner h2 {
    max-width: 100%;
    text-align: right;
  }

  hr {
    background: ${black};
    height: 0.1875rem;
    margin-top: 1.875rem;
    width: 18.75rem;
  }
`;

About.propTypes = propTypes;

export default About;
