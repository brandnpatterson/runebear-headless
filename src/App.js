import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './components/Header';
import Home from './components/Home';
import Loader from './components/Loader';
import styled from 'styled-components';
import { mediumUp, tiny } from './util/media';
import { fetchPages } from './actions';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchPages();
  }

  render() {
    const { loading } = this.props.pages;

    return (
      <StyledComponent>
        <Router>
          {loading ? (
            <Loader />
          ) : (
            <div>
              <Header />
              <Route exact path="/" component={Home} />
            </div>
          )}
        </Router>
      </StyledComponent>
    );
  }
}

const mapStateToProps = state => ({
  pages: state.pages,
  weekly: state.weekly
});

const mapDispatchToProps = { fetchPages };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

let StyledComponent = styled.div`
  justify-content: space-around;
  min-height: 600px;
  width: 100%;
  @media ${mediumUp} {
    width: 100%;
  }
  .image-wrapper {
    display: flex;
    @media ${tiny} {
      flex-direction: column;
    }
  }
  .image-wrapper img {
    margin: 20px;
    @media ${mediumUp} {
      margin: 20px 50px;
    }
  }
  .image-wrapper img:nth-child(2) {
    margin-bottom: 50px;
  }
  .loading {
    display: flex;
    height: 100vh;
    justify-content: center;
    margin-top: 250px;
  }
  .subtitle {
    max-width: 300px;
    text-align: center;
    @media ${mediumUp} {
      width: 550px;
    }
  }
`;
