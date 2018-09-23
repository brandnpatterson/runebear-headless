import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';

const propTypes = {
  __html: string
};

const Home = props => {
  document.title = 'Rune Bear';

  const __html = props.pages.home && props.pages.home.content.rendered;

  return <StyledHome dangerouslySetInnerHTML={{ __html }} />;
};

Home.propTypes = propTypes;

const mapStateToProps = state => ({
  pages: state.pages
});

export default connect(mapStateToProps)(Home);

const StyledHome = styled.div`
  p {
    align-items: center;
    display: flex;
    flex-direction: column;

    @media ${mediumUp} {
      align-items: center;
      display: flex;
      flex-direction: row;
    }
  }

  .home-subtitle {
    display: block;
    margin: 0 auto;
    text-align: center;
    width: 300px;

    @media ${mediumUp} {
      width: 450px;
    }
  }
`;
