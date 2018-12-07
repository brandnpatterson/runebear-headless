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
    currentGroup: [0, 1, 2, 3],
    currentPage: 1,
    loading: true,
    pageLength: 4,
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
    const { currentGroup, currentPage, pageLength } = this.state;

    if (newPage === 'next') {
      const newGroup = currentGroup.map(c => c + pageLength);

      this.setState({
        currentGroup: newGroup,
        currentPage: currentPage + 1
      });
    } else if (newPage === 'prev') {
      const newGroup = currentGroup.map(c => c - pageLength);

      this.setState({
        currentGroup: newGroup,
        currentPage: currentPage - 1
      });
    } else {
      const newGroup = [0, 1, 2, 3].map(c => {
        return c + newPage * pageLength - pageLength;
      });

      this.setState({
        currentGroup: newGroup,
        currentPage: newPage
      });
    }
  };

  filterPosts = (match, fromState) => {
    const posts = [];

    if (!match) {
      return this.state.weekly;
    }

    if (!fromState) {
      return this.state.weekly.posts.filter(post => post.slug === match)[0];
    }

    const taxonomy = window.location.pathname.split('/')[2].replace(/-/g, '_');

    fromState
      .filter(i => i.slug === match)
      .forEach(tax => {
        this.state.weekly.posts.forEach(post => {
          post[taxonomy].forEach(id => id === tax.id && posts.push(post));
        });
      });

    return {
      fromState,
      posts
    };
  };

  render() {
    const { currentGroup, currentPage, loading, routes, weekly } = this.state;
    const siteName = 'Rune Bear';

    const setDocument = params => {
      window.scrollTo(0, 0);
      document.title = `${firstUpper(params.replace(/-/g, ' '))} | ${siteName}`;
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
                      document.title = `About | ${siteName}`;

                      return <About route={routes.about} />;
                    }}
                  />
                  <Route
                    exact
                    path="/"
                    render={() => {
                      document.title = `${siteName}`;

                      return <Home route={routes.home} />;
                    }}
                  />
                  <Route
                    exact
                    path="/quarterly"
                    render={() => {
                      document.title = `Quarterly | ${siteName}`;

                      return <Quarterly route={routes.quarterly} />;
                    }}
                  />
                  <Route
                    exact
                    path="/submit"
                    render={() => {
                      document.title = `Submit | ${siteName}`;

                      return <Submit route={routes.submit} />;
                    }}
                  />
                  <Route
                    exact
                    path="/weekly"
                    render={() => {
                      document.title = `Weekly | ${siteName}`;
                      window.scrollTo(0, 0);

                      return (
                        <WeeklyPosts
                          changePage={this.changePage}
                          currentGroup={currentGroup}
                          currentPage={currentPage}
                          route={routes.weekly}
                          weekly={this.filterPosts()}
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
                          post={this.filterPosts(match.params.weeklyPost)}
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
                          currentGroup={currentGroup}
                          currentPage={currentPage}
                          weeklyByAuthor={this.filterPosts(
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
                          currentGroup={currentGroup}
                          currentPage={currentPage}
                          match={match}
                          weeklyByCategory={this.filterPosts(
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
                          currentGroup={currentGroup}
                          currentPage={currentPage}
                          match={match}
                          weeklyByTag={this.filterPosts(
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
