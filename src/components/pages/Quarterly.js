import React, { Component } from 'react';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';

import page from '../page';

class Quarterly extends Component {
  componentDidMount() {
    document.title = 'Quarterly | Rune Bear';
  }

  render() {
    const __html = this.props.__html;

    return (
      <StyledQuarterly
        className="quarterly"
        dangerouslySetInnerHTML={{ __html }}
      />
    );
  }
}

export default page(Quarterly);

const StyledQuarterly = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;

  @media ${mediumUp} {
    flex-direction: row;
    margin: 207px auto 0;
    max-width: 800px;
  }

  .speech-bubble-wrapper {
    position: relative;
  }

  .speech-bubble {
    @media ${mediumUp} {
      margin-top: -120px;
    }
  }

  .coming-soon-text {
    left: 50px;
    position: absolute;
    top: 70px;

    @media ${mediumUp} {
      font-size: 30px;
      left: 110px;
      top: 25px;
    }
  }
`;
