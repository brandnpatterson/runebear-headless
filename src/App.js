import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPages, fetchWeeklyPage } from './actions';

import Footer from './components/Footer';
import Header from './components/Header';
import Loading from './components/Loading';

import About from './components/pages/About';
import Quarterly from './components/pages/Quarterly';
import Home from './components/pages/Home';
import Weekly from './components/pages/Weekly';
import WeeklyPost from './components/pages/WeeklyPost';
import Submit from './components/pages/Submit';

import styled from 'styled-components';
import { mediumUp, tiny } from './util/media';

class App extends React.Component {
  state = {
    initialUpdate: false
  };

  componentDidMount() {
    this.props.fetchPages();
  }

  componentDidUpdate() {
    if (this.state.initialUpdate === false && this.props.weekly.totalPages) {
      for (let i = 1; i < this.props.weekly.totalPages + 1; i++) {
        if (!this.props.weekly[i]) {
          this.props.fetchWeeklyPage(i);
        }
      }

      this.setState({ initialUpdate: true });
    }
  }

  render() {
    const { loading } = this.props.pages;

    return (
      <StyledComponent>
        <Router>
          {loading ? (
            <Loading />
          ) : (
            <div>
              <Header />
              <Route exact path="/about" component={About} />
              <Route exact path="/" component={Home} />
              <Route exact path="/quarterly" component={Quarterly} />
              <Route exact path="/submit" component={Submit} />
              <Route exact path="/weekly" component={Weekly} />
              <Route
                exact
                path={`/weekly/:weeklyPost`}
                component={({ match }) => {
                  return (
                    <WeeklyPost
                      weeklyPost={this.props.weekly.all.filter(
                        post => post.slug === match.params.weeklyPost
                      )}
                    />
                  );
                }}
              />
              <Footer />
            </div>
          )}
        </Router>
      </StyledComponent>
    );
  }
}

const mapStateToProps = state => ({
  pages: state.pages,
  request: state.request,
  weekly: state.weekly
});

const mapDispatchToProps = { fetchPages, fetchWeeklyPage };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

const StyledComponent = styled.div`
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
