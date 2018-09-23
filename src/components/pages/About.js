import React from 'react';
import { connect } from 'react-redux';

import { string } from 'prop-types';
import styled from 'styled-components';
import { black, gray } from '../../util/color';
import { mediumUp } from '../../util/media';

const propTypes = {
  __html: string
};

const About = props => {
  document.title = 'Rune Bear';

  const __html = props.pages.about && props.pages.about.content.rendered;

  return <StyledAbout dangerouslySetInnerHTML={{ __html }} />;
};

About.propTypes = propTypes;

const mapStateToProps = state => ({
  pages: state.pages
});

export default connect(mapStateToProps)(About);

const StyledAbout = styled.div`
  .container {
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
