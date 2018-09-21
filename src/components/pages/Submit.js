import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { gray } from '../../util/color';
import { mediumUp, largeUp } from '../../util/media';

import page from '../page';

const propTypes = {
  __html: string
};

const Submit = ({ __html }) => {
  document.title = 'Submit | Rune Bear';

  return (
    <StyledSubmit
      className="submit flex-center"
      dangerouslySetInnerHTML={{ __html }}
    />
  );
};

Submit.propTypes = propTypes;

export default page(Submit);

const StyledSubmit = styled.div`
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
