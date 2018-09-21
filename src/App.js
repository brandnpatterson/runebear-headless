import React from 'react';
import { func, object } from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPages, fetchWeeklyPage } from './actions';
import { associateFilter } from './util';
import { mediumUp, tiny } from './util/media';
import styled from 'styled-components';

import Footer from './components/Footer';
import Header from './components/Header';
import Loading from './components/Loading';

import About from './components/pages/About';
import Home from './components/pages/Home';
import Quarterly from './components/pages/Quarterly';
import Submit from './components/pages/Submit';
import WeeklyPosts from './components/weekly/WeeklyPosts';
import WeeklyByAuthor from './components/weekly/WeeklyByAuthor';
import WeeklyByCategory from './components/weekly/WeeklyByCategory';
import WeeklyByTag from './components/weekly/WeeklyByTag';
import WeeklyByPost from './components/weekly/WeeklyByPost';

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
              <Route exact path="/weekly" component={WeeklyPosts} />
              <Route
                exact
                path={`/weekly/:weeklyPost`}
                component={({ match }) => {
                  return <WeeklyByPost weeklyByPost={filterByPost(match)} />;
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
