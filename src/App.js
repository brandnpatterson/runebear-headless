import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchRequests } from './api';
import { associateFilter, firstUpper } from './util';

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
import WeeklyByTag from './components/weekly/WeeklyByTag';
import WeeklyBySinglePost from './components/weekly/WeeklyBySinglePost';
import WeeklyPosts from './components/weekly/WeeklyPosts';

class App extends React.Component {
  state = {
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

  filterByAuthor = match => {
    const author = this.state.weekly.authors.filter(author => {
      return author.slug === match.params.author;
    });

    const posts = associateFilter({
      filterBy: author,
      group: this.state.weekly.posts,
      groupProp: 'post_author'
    });

    return { author, posts };
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

    return { posts };
  };

  filterByPost = match => {
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

    return {
      posts
    };
  };

  render() {
    const setDocument = params => {
      window.scrollTo(0, 0);
      document.title = `${firstUpper(params.replace(/-/g, ' '))} | Rune Bear`;
    };

    return (
      <StyledApp>
        <Router>
          {this.state.loading ? (
            <Loading />
          ) : (
            <div className={'wrapper ' + (this.state.loading ? '' : 'show')}>
              <Header routes={this.state.routes} weekly={this.state.weekly} />
              <div className="main-content">
                <Route
                  exact
                  path="/about"
                  render={() => {
                    document.title = 'About | Rune Bear';

                    return <About route={this.state.routes.about} />;
                  }}
                />
                <Route
                  exact
                  path="/"
                  render={() => {
                    document.title = 'Rune Bear';

                    return <Home route={this.state.routes.home} />;
                  }}
                />
                <Route
                  exact
                  path="/quarterly"
                  render={() => {
                    document.title = 'Quarterly | Rune Bear';

                    return <Quarterly route={this.state.routes.quarterly} />;
                  }}
                />
                <Route
                  exact
                  path="/submit"
                  render={() => {
                    document.title = 'Submit | Rune Bear';

                    return <Submit route={this.state.routes.submit} />;
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
                          route={this.state.routes.weekly}
                          weekly={this.state.weekly}
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
                        post={this.filterByPost(match)}
                        weekly={this.state.weekly}
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
                      <WeeklyByAuthor
                        weeklyByAuthor={this.filterByAuthor(match)}
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
                        match={match}
                        weeklyByCategory={this.filterByCategory(match)}
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
                        match={match}
                        weeklyByTag={this.filterByTag(match)}
                      />
                    );
                  }}
                />
              </div>
              <Footer __html={this.state.routes.footer.content.rendered} />
            </div>
          )}
        </Router>
      </StyledApp>
    );
  }
}

export default App;
