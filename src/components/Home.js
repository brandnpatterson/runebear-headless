import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { mediumUp, smallOnly } from '../util/media';

export class Home extends Component {
  state = {
    __html: null
  };

  componentDidMount() {
    const { home } = this.props.pages;
    this.setState({ __html: home });
  }

  render() {
    const { __html } = this.state;

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

const mapStateToProps = state => ({
  pages: state.pages
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

let StyledHome = styled.div`
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
