import React, { Component } from 'react';
import page from '../page';
import styled from 'styled-components';
import { gray } from '../../util/color';
import { mediumUp, largeUp } from '../../util/media';

class Submit extends Component {
  componentDidMount() {
    document.title = 'Submit | Rune Bear';
  }

  render() {
    const __html = this.props.__html;

    return (
      <StyledSubmit
        className="submit flex-center"
        dangerouslySetInnerHTML={{ __html }}
      />
    );
  }
}

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
