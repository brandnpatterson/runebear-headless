import React, { Component } from 'react';
import page from '../page';
import styled from 'styled-components';
import { black, gray } from '../../util/color';
import { mediumUp } from '../../util/media';

class About extends Component {
  componentDidMount() {
    document.title = 'About | Rune Bear';
  }

  render() {
    const __html = this.props.__html;

    return (
      <StyledAbout>
        <div
          className="about flex-center"
          dangerouslySetInnerHTML={{ __html }}
        />
      </StyledAbout>
    );
  }
}

export default page(About);

const StyledAbout = styled.div`
  .container {
    border-top: 1px solid ${gray};
    margin: 50px auto;
    max-width: 950px;
    padding: 30px 50px 50px;
    width: 100%;

    @media ${mediumUp} {
      border: 1px solid ${gray};
    }

    @media ${mediumUp} {
      display: flex;
      justify-content: space-around;
      width: 1100px;
    }
  }

  .container p {
    @media ${mediumUp} {
      padding-top: 10px;
    }
  }

  .content-inner h1 {
    font-size: 26px;
    margin-bottom: 0;
  }

  .content-inner h2 {
    font-size: 20px;
    margin-bottom: 30px;
  }

  .content-inner h1,
  .content-inner h2 {
    max-width: 100%;
    text-align: right;
  }

  hr {
    background: ${black};
    height: 3px;
    margin-top: 30px;
    width: 300px;
  }
`;
