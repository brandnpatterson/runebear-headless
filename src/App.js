import React from 'react';
import { func, object } from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPages, fetchWeeklyPage } from './actions';
import { associateFilter } from './util/associateFilter';
import styled from 'styled-components';
import { black } from './util/color';
import { garamond } from './util/font';
import { mediumUp } from './util/media';

import About from './components/pages/About';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/pages/Home';
import Loading from './components/Loading';
import Quarterly from './components/pages/Quarterly';
import Submit from './components/pages/Submit';
import WeeklyPosts from './components/weekly/WeeklyPosts';
import WeeklyByAuthor from './components/weekly/WeeklyByAuthor';
import WeeklyByCategory from './components/weekly/WeeklyByCategory';
import WeeklyByTag from './components/weekly/WeeklyByTag';
import WeeklySinglePost from './components/weekly/WeeklySinglePost';

class App extends React.Component {
  static propTypes = {
    fetchPages: func.isRequired,
    fetchWeeklyPage: func.isRequired,
    pages: object.isRequired,
    weekly: object.isRequired
  };

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
      const author = this.props.weekly.allAuthors.filter(author => {
        return author.slug === match.params.author;
      });

      const posts = associateFilter({
        haystack: this.props.weekly.all,
        needle: author,
        hayProp: 'post_author'
      });

      return {
        author,
        posts
      };
    };

    const filterByCategory = match => {
      const categories = this.props.weekly.allCategories.filter(category => {
        return category.slug === match.params.category;
      });

      const posts = associateFilter({
        haystack: this.props.weekly.all,
        needle: categories,
        hayProp: 'categories'
      });

      return {
        categories,
        posts
      };
    };

    const filterByPost = match => {
      const post = this.props.weekly.all.filter(post => {
        return post.slug === match.params.weeklyPost;
      });

      const authors = associateFilter({
        haystack: this.props.weekly.allAuthors,
        needle: post,
        needleProp: 'post_author'
      });

      const categories = associateFilter({
        haystack: this.props.weekly.allCategories,
        needle: post,
        needleProp: 'categories'
      });

      const tags = associateFilter({
        haystack: this.props.weekly.allTags,
        needle: post,
        needleProp: 'tags'
      });

      return {
        authors,
        categories,
        post: post[0],
        tags
      };
    };

    const filterByTag = match => {
      const tags = this.props.weekly.allTags.filter(tag => {
        return tag.slug === match.params.tag;
      });

      const posts = associateFilter({
        haystack: this.props.weekly.all,
        needle: tags,
        hayProp: 'tags'
      });

      return {
        posts,
        tags
      };
    };

    return (
      <StyledApp>
        <Router>
          {loading ? (
            <Loading />
          ) : (
            <div className="wrapper">
              <Header />
              <div className="main-content">
                <Route exact path="/about" component={About} />
                <Route exact path="/" component={Home} />
                <Route exact path="/quarterly" component={Quarterly} />
                <Route exact path="/submit" component={Submit} />
                <Route exact path="/weekly" component={WeeklyPosts} />
                <Route
                  exact
                  path={`/weekly/:weeklyPost`}
                  component={({ match }) => {
                    return (
                      <WeeklySinglePost
                        weeklySinglePost={filterByPost(match)}
                      />
                    );
                  }}
                />
                <Route
                  exact
                  path={`/weekly/authors/:author`}
                  component={({ match }) => {
                    return (
                      <WeeklyByAuthor weeklyByAuthor={filterByAuthor(match)} />
                    );
                  }}
                />
                <Route
                  exact
                  path={`/weekly/categories/:category`}
                  component={({ match }) => {
                    return (
                      <WeeklyByCategory
                        match={match}
                        weeklyByCategory={filterByCategory(match)}
                      />
                    );
                  }}
                />
                <Route
                  exact
                  path={`/weekly/tags/:tag`}
                  component={({ match }) => {
                    return (
                      <WeeklyByTag
                        match={match}
                        weeklyByTag={filterByTag(match)}
                      />
                    );
                  }}
                />
              </div>
              <Footer />
            </div>
          )}
        </Router>
      </StyledApp>
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

const StyledApp = styled.div`
  .wrapper {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .main-content {
    display: flex;
    flex: 1;
    justify-content: center;
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

   {
    /* .featured-hero is defined in the wordpress CMS on Pages */
  }
  .featured-hero {
    align-items: center;
    display: flex;
    flex-direction: column-reverse;
    margin: 0 auto;
    justify-content: space-between;

    @media ${mediumUp} {
      flex-direction: row;
      max-width: 630px;
    }

    h1 {
      font-size: 70px;

      @media ${mediumUp} {
        font-size: 100px;
        margin-top: 30px;
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
    margin: 50px auto 100px;
    width: 400px;
  }
`;
