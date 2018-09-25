import React from 'react';
import { object } from 'prop-types';
import styled from 'styled-components';
import { gray } from '../../util/color';
import { mediumUp, largeUp } from '../../util/media';

const propTypes = {
  page: object.isRequired
};

const Submit = ({ page }) => {
  document.title = 'Rune Bear';

  const __html = page && page.content.rendered;

  return <StyledSubmit dangerouslySetInnerHTML={{ __html }} />;
};

const StyledSubmit = styled.div`
  display: flex;
  flex-direction: column;

  @media ${mediumUp} {
    flex-direction: row;
    margin: 0 auto;
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
