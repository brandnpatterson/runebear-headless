import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchRequests } from './api';
import { associateFilter, firstUpper, setPageIndexes } from './util';

import About from './components/pages/About';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/pages/Home';
import Loading from './components/Loading';
import Quarterly from './components/pages/Quarterly';
import StyledApp from './components/styled/StyledApp';
import Submit from './components/pages/Submit';
import WeeklyByAuthor from './components/weekly/WeeklyByAuthor';
import WeeklyByCategory from './components/weekly/WeeklyByCategory';
import WeeklyBySinglePost from './components/weekly/WeeklyBySinglePost';
import WeeklyByTag from './components/weekly/WeeklyByTag';
import WeeklyPosts from './components/weekly/WeeklyPosts';

class App extends React.Component {
  state = {
    currentPage: 1,
    loading: true,
    routes: {},
    weekly: {}
  };

  componentDidMount() {
    fetchRequests().then(data => {
      this.setState({
        routes: data.routes,
        loading: false,
        weekly: data.weekly
      });
    });
  }

  changePage = (newPage = 1) => {
    if (newPage === 'next') {
      this.setState({
        currentPage: this.state.currentPage + 1
      });
    } else if (newPage === 'prev') {
      this.setState({
        currentPage: this.state.currentPage - 1
      });
    } else {
      this.setState({
        currentPage: newPage
      });
    }
  };

  filterByAuthor = match => {
    const author = this.state.weekly.authors.filter(author => {
      return author.slug === match.params.author;
    });

    const posts = associateFilter({
      filterBy: author,
      group: this.state.weekly.posts,
      groupProp: 'post_author'
    });

    return setPageIndexes({
      author,
      posts
    });
  };

  filterByCategory = match => {
    const category = this.state.weekly.categories.filter(category => {
      return category.slug === match.params.category;
    });

    const posts = associateFilter({
      filterBy: category,
      group: this.state.weekly.posts,
      groupProp: 'categories'
    });

    return setPageIndexes({
      posts
    });
  };

  filterByPost = posts => {
    return setPageIndexes(posts);
  };

  filterBySinglePost = match => {
    const post = this.state.weekly.posts.filter(post => {
      return post.slug === match.params.weeklyPost;
    });

    return post[0];
  };

  filterByTag = match => {
    const tag = this.state.weekly.tags.filter(tag => {
      return tag.slug === match.params.tag;
    });

    const posts = associateFilter({
      filterBy: tag,
      group: this.state.weekly.posts,
      groupProp: 'tags'
    });

    return setPageIndexes({
      posts
    });
  };

  render() {
    const { loading, routes, weekly } = this.state;

    const setDocument = params => {
      window.scrollTo(0, 0);
      document.title = `${firstUpper(params.replace(/-/g, ' '))} | Rune Bear`;
    };

    return (
      <StyledApp>
        <Router>
          {loading ? (
            <Loading />
          ) : (
            <div className={'wrapper ' + (loading ? '' : 'show')}>
              <Header
                changePage={this.changePage}
                routes={routes}
                weekly={weekly}
              />
              <div className="main-content">
                <Route
                  exact
                  path="/about"
                  render={() => {
                    document.title = 'About | Rune Bear';

                    return <About route={routes.about} />;
                  }}
                />
                <Route
                  exact
                  path="/"
                  render={() => {
                    document.title = 'Rune Bear';

                    return <Home route={routes.home} />;
                  }}
                />
                <Route
                  exact
                  path="/quarterly"
                  render={() => {
                    document.title = 'Quarterly | Rune Bear';

                    return <Quarterly route={routes.quarterly} />;
                  }}
                />
                <Route
                  exact
                  path="/submit"
                  render={() => {
                    document.title = 'Submit | Rune Bear';

                    return <Submit route={routes.submit} />;
                  }}
                />
                <Route
                  exact
                  path="/weekly"
                  render={() => {
                    document.title = 'Weekly | Rune Bear';
                    window.scrollTo(0, 0);

                    return (
                      <div>
                        <WeeklyPosts
                          changePage={this.changePage}
                          currentPage={this.state.currentPage}
                          route={routes.weekly}
                          weekly={this.filterByPost(weekly)}
                        />
                      </div>
                    );
                  }}
                />
                <Route
                  exact
                  path={`/weekly/:weeklyPost`}
                  render={({ match }) => {
                    return (
                      <WeeklyBySinglePost
                        post={this.filterBySinglePost(match)}
                        weekly={weekly}
                      />
                    );
                  }}
                />
                <Route
                  exact
                  path={`/weekly/authors/:author`}
                  render={({ match }) => {
                    setDocument(match.params.author);

                    return (
                      <div>
                        <WeeklyByAuthor
                          changePage={this.changePage}
                          currentPage={this.state.currentPage}
                          weeklyByAuthor={this.filterByAuthor(match)}
                        />
                      </div>
                    );
                  }}
                />
                <Route
                  exact
                  path={`/weekly/categories/:category`}
                  render={({ match }) => {
                    setDocument(match.params.category);

                    return (
                      <div>
                        <WeeklyByCategory
                          changePage={this.changePage}
                          currentPage={this.state.currentPage}
                          match={match}
                          weeklyByCategory={this.filterByCategory(match)}
                        />
                      </div>
                    );
                  }}
                />
                <Route
                  exact
                  path={`/weekly/tags/:tag`}
                  render={({ match }) => {
                    setDocument(match.params.tag);

                    return (
                      <div>
                        <WeeklyByTag
                          changePage={this.changePage}
                          currentPage={this.state.currentPage}
                          match={match}
                          weeklyByTag={this.filterByTag(match)}
                        />
                      </div>
                    );
                  }}
                />
              </div>
              <Footer __html={routes.footer.content.rendered} />
            </div>
          )}
        </Router>
      </StyledApp>
    );
  }
}

export default App;
