import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { fetchAll } from './api';
import { associateFilter } from './util';
import styled from 'styled-components';
import { black, blue, dark, dark2, white } from './util/color';
import { garamond } from './util/font';
import { mediumUp, smallOnly } from './util/media';

import About from './components/pages/About';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/pages/Home';
import Loading from './components/Loading';
import Quarterly from './components/pages/Quarterly';
import Submit from './components/pages/Submit';
import WeeklyByAuthor from './components/weekly/WeeklyByAuthor';
import WeeklyByCategory from './components/weekly/WeeklyByCategory';
import WeeklyByTag from './components/weekly/WeeklyByTag';
import WeeklyBySinglePost from './components/weekly/WeeklyBySinglePost';
import WeeklyPagination from './components/weekly/WeeklyPagination';
import WeeklyPosts from './components/weekly/WeeklyPosts';

class App extends React.Component {
  state = {
    loading: true,
    pages: {},
    showWrapper: false,
    weekly: {},
    weeklyPage: 1
  };

  componentDidMount() {
    fetchAll().then(data => {
      this.setState({
        loading: false,
        pages: data.pages,
        weekly: data.weekly
      });

      setTimeout(() => {
        this.setState({ showWrapper: true });
      }, 0);
    });
  }

  changeWeeklyPage = newPage => {
    let { weeklyPage } = this.state;

    if (newPage === 'next') {
      this.setState({ weeklyPage: weeklyPage + 1 });
    } else if (newPage === 'prev') {
      this.setState({ weeklyPage: weeklyPage - 1 });
    } else {
      this.setState({ weeklyPage: newPage });
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

    return {
      author,
      posts
    };
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

    return posts;
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

    return posts;
  };

  render() {
    const { loading, showWrapper } = this.state;

    return (
      <StyledApp>
        <Router>
          {loading ? (
            <Loading />
          ) : (
            <div className={'wrapper ' + (showWrapper ? 'show' : '')}>
              <Header
                changeWeeklyPage={this.changeWeeklyPage}
                pages={this.state.pages}
                weekly={this.state.weekly}
              />
              <div className="main-content">
                <Route
                  exact
                  path="/about"
                  render={() => {
                    document.title = 'About | Rune Bear';

                    return <About page={this.state.pages.about} />;
                  }}
                />
                <Route
                  exact
                  path="/"
                  render={() => {
                    document.title = 'Rune Bear';

                    return <Home page={this.state.pages.home} />;
                  }}
                />
                <Route
                  exact
                  path="/quarterly"
                  render={() => {
                    document.title = 'Quarterly | Rune Bear';

                    return <Quarterly page={this.state.pages.quarterly} />;
                  }}
                />
                <Route
                  exact
                  path="/submit"
                  render={() => {
                    document.title = 'Submit | Rune Bear';

                    return <Submit page={this.state.pages.submit} />;
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
                          page={this.state.pages.weekly}
                          weekly={this.state.weekly}
                          weeklyPage={this.state.weeklyPage}
                        />
                        <WeeklyPagination
                          changeWeeklyPage={this.changeWeeklyPage}
                          weekly={this.state.weekly}
                          weeklyPage={this.state.weeklyPage}
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
                    window.scrollTo(0, 0);

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
                    window.scrollTo(0, 0);

                    return (
                      <WeeklyByCategory
                        match={match}
                        posts={this.filterByCategory(match)}
                      />
                    );
                  }}
                />
                <Route
                  exact
                  path={`/weekly/tags/:tag`}
                  render={({ match }) => {
                    return (
                      <WeeklyByTag
                        match={match}
                        posts={this.filterByTag(match)}
                      />
                    );
                  }}
                />
              </div>
              <Footer footer={this.state.pages.footer} />
            </div>
          )}
        </Router>
      </StyledApp>
    );
  }
}

const StyledApp = styled.div`
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    opacity: 0;
    transition: 1.5s;
    visibility: hidden;
  }

  .wrapper.show {
    opacity: 1;
    visibility: visible;
  }

  .btn {
    background-color: #ddd;
    border: none;
    color: black;
    padding: 16px 32px;
    text-align: center;
    font-size: 16px;
    margin: 4px 2px;
    transition: 0.3s;
  }

  .btn:hover {
    color: white;
  }

  .loading-screen {
    align-items: center;
    background: ${dark};
    color: ${white};
    display: flex;
    flex-direction: column;
    padding-top: 120px;
    position: relative;
    height: 100vh;
    width: 100vw;

    @media ${smallOnly} {
      padding-top: 80px;
    }
  }

  .loading-screen h2 {
    margin-left: 10px;
    position: absolute;
    top: 300px;

    @media ${mediumUp} {
      top: 450px;
    }
  }

  .main-content {
    display: flex;
    flex: 1;
    justify-content: center;

    @media ${smallOnly} {
      margin-top: -50px;
    }
  }

  li {
    list-style-type: none;
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: ${garamond};
  }

  h1 {
    font-size: 26px;
    @media ${mediumUp} {
      font-size: 30px;
    }
  }

  h2 {
    font-size: 22px;
    @media ${mediumUp} {
      font-size: 24px;
    }
  }

  h3 {
    font-size: 20px;
    @media ${mediumUp} {
      font-size: 22px;
    }
  }

  h4 {
    font-size: 18px;
    @media ${mediumUp} {
      font-size: 20px;
    }
  }

  img {
    height: 200px;
    width: 200px;
    @media ${mediumUp} {
      height: 400px;
      width: 400px;
    }
  }

  /* .featured-hero is defined in the wordpress CMS on Pages */
  .featured-hero {
    align-items: center;
    display: flex;
    flex-direction: column-reverse;
    margin: 0 auto 100px;
    justify-content: space-between;

    @media ${mediumUp} {
      flex-direction: row;
      max-width: 630px;
    }

    h1 {
      font-size: 70px;

      @media ${mediumUp} {
        font-size: 100px;
      }
    }

    img {
      height: 150px;
      width: 150px;
    }

    strong {
      color: ${black};
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin: 50px auto 100px;

    ul {
      display: flex;
    }
  }

  .filter-header {
    margin-bottom: 80px;
    max-width: 700px;
    padding: 1.5rem;

    @media ${mediumUp} {
      margin-bottom: 0;
    }

    strong {
      color: ${dark2};
    }
  }

  .filter-page {
    @media ${mediumUp} {
      margin-bottom: 100px;
    }
  }

  .author-links a {
    color: ${dark2};
  }

  .author-links a:hover {
    color: ${blue};
  }
`;

export default App;
