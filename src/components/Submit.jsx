import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { gray } from '../util/color';
import { mediumUp, largeUp } from '../util/media';

let propTypes = {
  __html: string.isRequired,
  pageClass: string.isRequired,
  pageTitle: string.isRequired
};

let Submit = ({ __html, pageClass, pageTitle }) => {
  document.title = `${pageTitle} | Rune Bear`;

  return (
    <StyledSubmit
      className={`${pageClass} flex-center`}
      dangerouslySetInnerHTML={{ __html }}
    />
  );
};

let StyledSubmit = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin: 0 auto;

  @media ${mediumUp} {
    flex-direction: row !important;
  }

  @media ${largeUp} {
    max-width: 80%;
  }

  .card {
    align-items: left;
    display: flex;
    flex-direction: column;
    padding: 0 30px 50px;
    width: 100%;

    @media ${mediumUp} {
      border: 1px solid ${gray};
      margin: 50px 30px;
      width: 50%;
    }
  }

  .card h1 {
    display: block;
    font-size: 110px;
    font-weight: bold;
    margin: 30px auto;
    padding-top: 0;
  }

  .card p {
    margin-bottom: 24px;
  }
`;

Submit.propTypes = propTypes;

export default Submit;
