import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { fetchFirstPage, fetchPostAndPages, fetchAllRequests } from './api';
import { firstUpper } from './util';

import About from './components/pages/About';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/pages/Home';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import Quarterly from './components/pages/Quarterly';
import StyledApp from './styled/StyledApp';
import Submit from './components/pages/Submit';
import Weekly from './components/pages/Weekly';
import WeeklyByAuthor from './components/pages/WeeklyByAuthor';
import WeeklyByCategory from './components/pages/WeeklyByCategory';
import WeeklyBySinglePost from './components/pages/WeeklyBySinglePost';
import WeeklyByTag from './components/pages/WeeklyByTag';

class App extends React.Component {
  state = {
    categories: [],
    currentGroup: [0, 1, 2, 3],
    currentPage: 1,
    loading: true,
    loading_secondary: true,
    pageLength: 4,
    pages: [],
    post_author: [],
    tags: [],
    weekly_posts: []
  };

  componentDidMount() {
    const fetchAll = () => {
      fetchAllRequests().then(data => {
        this.setState({
          categories: data[0],
          loading_secondary: false,
          pages: data[1],
          post_author: data[2],
          tags: data[3],
          weekly_posts: data[4]
        });
      });
    };

    if (
      window.location.pathname.indexOf('weekly') === 1 &&
      window.location.pathname.indexOf('categories') === -1 &&
      window.location.pathname.indexOf('tags') === -1 &&
      window.location.pathname !== '/weekly' &&
      window.location.pathname.length > 8
    ) {
      /**
       *  Load Weekly Single Post, then all
       */
      fetchPostAndPages(window.location.pathname.split('/')[2])
        .then(data => {
          this.setState({
            loading: false,
            pages: data[0],
            weekly_posts: data[1]
          });
        })
        .then(() => fetchAll());
    } else {
      /**
       *  Load First Page, then all
       */

      fetchFirstPage()
        .then(data => {
          this.setState({
            loading: false,
            pages: data[0],
            weekly_posts: data[1]
          });
        })
        .then(() => fetchAll());
    }
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
      return this.state.weekly_posts;
    }

    if (!fromState) {
      return this.state.weekly_posts.filter(post => post.slug === match)[0];
    }

    const taxonomy = window.location.pathname.split('/')[2].replace(/-/g, '_');

    fromState
      .filter(i => i.slug === match)
      .forEach(tax => {
        this.state.weekly_posts.forEach(post => {
          post[taxonomy].forEach(id => id === tax.id && posts.push(post));
        });
      });

    return {
      fromState,
      posts
    };
  };

  render() {
    const {
      categories,
      currentGroup,
      currentPage,
      loading,
      loading_secondary,
      pages,
      post_author,
      tags,
      weekly_posts
    } = this.state;
    const siteName = 'Rune Bear';

    const setDocument = params => {
      window.scrollTo(0, 0);
      document.title = `${firstUpper(params.replace(/-/g, ' '))} | ${siteName}`;
    };

    return (
      <StyledApp>
        {loading ? (
          <Loading />
        ) : (
          <div className="wrapper">
            <Header
              changePage={this.changePage}
              pages={pages
                .filter(page => page.slug !== 'footer')
                .sort((a, b) => a.id - b.id)}
            />
            <div className="main-content">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => {
                    document.title = `${siteName}`;

                    return <Home pages={pages} />;
                  }}
                />
                <Route
                  exact
                  path="/about"
                  render={() => {
                    document.title = `About | ${siteName}`;

                    return <About pages={pages} />;
                  }}
                />
                <Route
                  exact
                  path="/quarterly"
                  render={() => {
                    document.title = `Quarterly | ${siteName}`;

                    return <Quarterly pages={pages} />;
                  }}
                />
                <Route
                  exact
                  path="/submit"
                  render={() => {
                    document.title = `Submit | ${siteName}`;

                    return <Submit pages={pages} />;
                  }}
                />
                <Route
                  exact
                  path="/weekly"
                  render={() => {
                    document.title = `Weekly | ${siteName}`;

                    return (
                      <Weekly
                        changePage={this.changePage}
                        currentGroup={currentGroup}
                        currentPage={currentPage}
                        pages={pages}
                        posts={this.filterPosts()}
                      />
                    );
                  }}
                />
                <Route
                  exact
                  path={`/weekly/:weeklySinglePost`}
                  render={({ match }) => {
                    return (
                      <WeeklyBySinglePost
                        loading_secondary={loading_secondary}
                        post={
                          weekly_posts.length === 1
                            ? weekly_posts[0]
                            : this.filterPosts(match.params.weeklySinglePost)
                        }
                        posts={weekly_posts}
                      />
                    );
                  }}
                />
                <Route
                  exact
                  path={`/weekly/post-author/:author`}
                  render={({ match }) => {
                    setDocument(match.params.author);

                    let author;
                    let auth;
                    for (auth in post_author) {
                      if (post_author[auth].slug === match.params.author) {
                        author = post_author[auth];
                      }
                    }

                    return (
                      <WeeklyByAuthor
                        changePage={this.changePage}
                        currentGroup={currentGroup}
                        currentPage={currentPage}
                        weeklyByAuthor={this.filterPosts(match.params.author, [
                          author
                        ])}
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
                          categories
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
                        weeklyByTag={this.filterPosts(match.params.tag, tags)}
                      />
                    );
                  }}
                />
                <Route render={NotFound} />
              </Switch>
            </div>
            <Footer pages={pages} />
          </div>
        )}
      </StyledApp>
    );
  }
}

export default App;
