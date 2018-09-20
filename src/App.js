import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPages, fetchWeeklyPage } from './actions';

import Footer from './components/Footer';
import Header from './components/Header';
import Loading from './components/Loading';

import About from './components/pages/About';
import Author from './components/pages/Author';
import Quarterly from './components/pages/Quarterly';
import Home from './components/pages/Home';
import Weekly from './components/pages/Weekly';
import WeeklyCategory from './components/pages/WeeklyCategory';
import WeeklyTag from './components/pages/WeeklyTag';
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
    this.props.fetchWeeklyPage();
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

    const filterByAuthor = match => {
      return (
        this.props.weekly.allAuthors &&
        this.props.weekly.allAuthors.filter(author => {
          return author.slug === match.params.author;
        })
      );
    };

    const filterByCategory = match => {
      return (
        this.props.weekly.allCategories &&
        this.props.weekly.allCategories.filter(category => {
          return category.slug === match.params.category;
        })
      );
    };

    const filterByPost = match => {
      return (
        this.props.weekly.all &&
        this.props.weekly.all.filter(
          post => post.slug === match.params.weeklyPost
        )
      );
    };

    const filterByTag = match => {
      return (
        this.props.weekly.allTags &&
        this.props.weekly.allTags.filter(tag => {
          return tag.slug === match.params.tagName;
        })
      );
    };

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
                  return <WeeklyPost weeklyPost={filterByPost(match)} />;
                }}
              />
              <Route
                exact
                path={`/weekly/authors/:author`}
                component={({ match }) => {
                  return (
                    <Author
                      match={match}
                      weeklyByAuthor={filterByAuthor(match)}
                    />
                  );
                }}
              />
              <Route
                exact
                path={`/weekly/categories/:category`}
                component={({ match }) => {
                  return (
                    <WeeklyCategory
                      match={match}
                      weeklyByCategory={filterByCategory(match)}
                    />
                  );
                }}
              />
              <Route
                exact
                path={`/weekly/tags/:tagName`}
                component={({ match }) => {
                  return (
                    <WeeklyTag match={match} weeklyByTag={filterByTag(match)} />
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
