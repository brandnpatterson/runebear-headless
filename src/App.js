import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { fetchRequests } from './api';
import { firstUpper } from './util';

import About from './components/pages/About';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/pages/Home';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
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

  filterBy = (match, filtered) => {
    const posts = [];

    const indexed = pages => {
      let page = 1;
      let begin = 0;
      let end = 4;
      const total = Math.ceil(pages.posts.length / end) + 1;

      while (page < total) {
        pages[page] = pages.posts.slice(begin, end);
        pages.totalPages = page;

        begin = begin + 4;
        end = end + 4;
        page++;
      }

      return pages;
    };

    if (match) {
      if (filtered) {
        const taxonomy = window.location.pathname
          .split('/')[2]
          .replace(/-/g, '_');

        filtered
          .filter(i => i.slug === match)
          .forEach(tax => {
            this.state.weekly.posts.forEach(post => {
              post[taxonomy].forEach(id => id === tax.id && posts.push(post));
            });
          });

        return indexed({
          filtered,
          posts
        });
      } else {
        return this.state.weekly.posts.filter(post => post.slug === match)[0];
      }
    } else {
      return indexed(this.state.weekly);
    }
  };

  render() {
    const { currentPage, loading, routes, weekly } = this.state;

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
                <Switch>
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
                        <WeeklyPosts
                          changePage={this.changePage}
                          currentPage={currentPage}
                          route={routes.weekly}
                          weekly={this.filterBy()}
                        />
                      );
                    }}
                  />
                  <Route
                    exact
                    path={`/weekly/:weeklyPost`}
                    render={({ match }) => {
                      return (
                        <WeeklyBySinglePost
                          currentPage={currentPage}
                          post={this.filterBy(match.params.weeklyPost)}
                          weekly={weekly}
                        />
                      );
                    }}
                  />
                  <Route
                    exact
                    path={`/weekly/post-author/:author`}
                    render={({ match }) => {
                      setDocument(match.params.author);

                      return (
                        <WeeklyByAuthor
                          changePage={this.changePage}
                          currentPage={currentPage}
                          weeklyByAuthor={this.filterBy(
                            match.params.author,
                            weekly.authors
                          )}
                        />
                      );
                    }}
                  />
                  <Route
                    exact
                    path={`/weekly/categories/:category`}
                    render={({ match }) => {
                      setDocument(match.params.category);

                      return (
                        <WeeklyByCategory
                          changePage={this.changePage}
                          currentPage={currentPage}
                          match={match}
                          weeklyByCategory={this.filterBy(
                            match.params.category,
                            weekly.categories
                          )}
                        />
                      );
                    }}
                  />
                  <Route
                    exact
                    path={`/weekly/tags/:tag`}
                    render={({ match }) => {
                      setDocument(match.params.tag);

                      return (
                        <WeeklyByTag
                          changePage={this.changePage}
                          currentPage={currentPage}
                          match={match}
                          weeklyByTag={this.filterBy(
                            match.params.tag,
                            weekly.tags
                          )}
                        />
                      );
                    }}
                  />
                  <Route render={NotFound} />
                </Switch>
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
