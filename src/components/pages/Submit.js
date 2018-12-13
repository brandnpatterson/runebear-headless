import React from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';
import { gray } from '../../util/color';
import { mediumUp, largeUp } from '../../util/media';

const propTypes = {
  route: object.isRequired
};

const Submit = ({ route }) => {
  return (
    <StyledSubmit
      dangerouslySetInnerHTML={{ __html: route.content.rendered }}
    />
  );
};

const StyledSubmit = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 6.25rem;

  @media ${mediumUp} {
    flex-direction: row;
  }

  @media ${largeUp} {
    max-width: 80%;
  }

  .card {
    align-items: left;
    box-shadow: none !important;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 90%;
    padding: 0 1.875rem 3.125rem;
    width: 100%;

    @media ${mediumUp} {
      border: 0.0625rem solid ${gray};
      margin: 3.125rem 1.875rem;
      width: 50%;
    }
  }

  .card h1 {
    display: block;
    font-size: 6.875rem;
    font-weight: bold;
    margin: 1.875rem auto;
    padding-top: 0;
  }

  .card p {
    margin-bottom: 1.5rem;
  }
`;

Submit.propTypes = propTypes;

export default Submit;
