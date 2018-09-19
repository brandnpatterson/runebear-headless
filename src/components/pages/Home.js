import React, { Component } from 'react';
import page from '../page';
import styled from 'styled-components';
import { mediumUp, smallOnly } from '../../util/media';

class Home extends Component {
  componentDidMount() {
    document.title = 'Rune Bear';
  }

  render() {
    const __html = this.props.__html;

    return (
      <StyledHome>
        <div
          className="home flex-center"
          dangerouslySetInnerHTML={{ __html }}
        />
      </StyledHome>
    );
  }
}

export default page(Home);

const StyledHome = styled.div`
  margin-top: 73px;

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
