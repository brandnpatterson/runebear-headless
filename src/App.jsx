import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { mediumUp, tiny } from './util/media';
import { getTaxonomy, getPages, getWeeklyPosts } from './api';

// Components
import About from './components/About';
import Author from './components/Author';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Quarterly from './components/Quarterly';
import Submit from './components/Submit';
import Weekly from './components/weekly/WeeklyTag';
import WeeklyCategory from './components/weekly/WeeklyCategory';
import WeeklyPost from './components/weekly/WeeklyPost';
import WeeklyPostsContainer from './components/weekly/WeeklyPostsContainer';

class App extends React.Component {
  state = {
    authors: [],
    categories: null,
    pages: null,
    header: null,
    loading: true,
    footer: null,
    tags: null,
    weeklyPosts: null,
    weeklyRequestMade: false
  };

  componentDidMount() {
    getPages().then(data => {
      let { pages, header, footer } = data;

      this.setState({ pages, header, loading: false, footer: footer[0] });
    });
  }

  getWeeklyPostsRequest = () => {
    let allAuthors = [];
    let allCategories = [];
    let allTags = [];

    getWeeklyPosts()
      .then(weeklyPosts => {
        this.setState({ weeklyPosts });
      })
      .then(() => {
        let { weeklyPosts } = this.state;

        if (weeklyPosts.length === 0) {
          return;
        } else {
          return weeklyPosts.map(post => {
            let categories = [];
            let tagNames = [];

            getTaxonomy('tags', post.id)
              .then(data => {
                if (data) {
                  return data.map(tag => {
                    tagNames.push(tag.name);
                    allTags.push(tag.name);
                    allTags = [...new Set(allTags)].sort();

                    return (post.tagNames = tagNames);
                  });
                } else {
                  return allTags.push('');
                }
              })
              .then(() =>
                this.setState({
                  tags: allTags,
                  weeklyPosts
                })
              );

            getTaxonomy('categories', post.id)
              .then(data => {
                if (data) {
                  return data.map(tag => {
                    categories.push(tag.name);
                    allCategories.push(tag.name);
                    allCategories = [...new Set(allCategories)].sort();

                    return (post.categories = categories);
                  });
                } else {
                  return allCategories.push('');
                }
              })
              .then(() => {
                this.setState({
                  categories: allCategories,
                  weeklyPosts
                });
              });

            return getTaxonomy('post_author', post.id)
              .then(data => {
                if (data && data[0] && data[0].name) {
                  let checkAndAdd = name => {
                    let found = allAuthors.some(el => el.name === name);

                    if (!found) {
                      allAuthors.push({
                        name: data[0].name,
                        description: data[0].description,
                        slug: data[0].slug
                      });
                    }
                  };

                  checkAndAdd(data[0].name);

                  post.author = data[0].name;
                  post.authorSlug = data[0].slug;
                  post.authorDesc = data[0].description;
                } else {
                  post.author = '';
                  post.authorSlug = '';
                  post.authorDesc = '';
                }
              })
              .then(() => {
                this.setState({
                  authors: allAuthors,
                  weeklyPosts,
                  weeklyRequestMade: true
                });
              });
          });
        }
      });
  };

  render() {
    let { weeklyPosts, weeklyRequestMade } = this.state;

    let filterByAuthor = match =>
      weeklyPosts &&
      weeklyPosts.filter(post => post.authorSlug === match.params.author);

    let filterByPost = match =>
      weeklyPosts &&
      weeklyPosts.filter(post => post.slug === match.params.weeklyPost);

    let filterByCategory = match => {
      return (
        weeklyPosts &&
        weeklyPosts.map(post => {
          if (post.categories) {
            return post.categories.map(tag => {
              if (tag === match.params.category) {
                return post;
              } else return null;
            });
          } else return null;
        })
      );
    };

    let filterByTag = match => {
      return (
        weeklyPosts &&
        weeklyPosts.map(post => {
          if (post.tagNames) {
            return post.tagNames.map(tag => {
              if (tag === match.params.tagName) {
                return post;
              } else return null;
            });
          } else return null;
        })
      );
    };

    const Loading = () => {
      return (
        <div
          style={{
            marginTop: '250px',
            display: 'flex',
            height: '100vh',
            justifyContent: 'center'
          }}
          className="loading"
        >
          <h2>Loading...</h2>
        </div>
      );
    };

    if (this.state.loading) {
      return <Loading />;
    } else {
      return (
        <Router>
          <div id="router-container">
            <Header
              header={this.state.header}
              getWeeklyPosts={this.getWeeklyPostsRequest}
              weeklyRequestMade={this.state.weeklyRequestMade}
            />
            <Switch>
              {this.state.pages &&
                this.state.pages.map(page => {
                  let path = () =>
                    page.title.rendered === 'Home' ? '/' : '/' + page.slug;

                  let Component = () => {
                    if (page.title.rendered === 'About')
                      return (
                        <About
                          __html={page.content.rendered}
                          pageClass={page.slug}
                          pageTitle={page.title.rendered}
                        />
                      );
                    if (page.title.rendered === 'Home')
                      return (
                        <Home
                          __html={page.content.rendered}
                          pageClass={page.slug}
                          pageTitle={page.title.rendered}
                        />
                      );
                    if (page.title.rendered === 'Quarterly')
                      return (
                        <Quarterly
                          __html={page.content.rendered}
                          pageClass={page.slug}
                          pageTitle={page.title.rendered}
                        />
                      );
                    if (page.title.rendered === 'Submit')
                      return (
                        <Submit
                          __html={page.content.rendered}
                          pageClass={page.slug}
                          pageTitle={page.title.rendered}
                        />
                      );
                    if (page.title.rendered === 'Weekly')
                      if (weeklyRequestMade) {
                        return (
                          this.state.weeklyPosts && (
                            <WeeklyPostsContainer
                              __html={page.content.rendered}
                              pageClass={page.slug}
                              pageTitle={page.title.rendered}
                              weeklyPosts={this.state.weeklyPosts}
                              weeklyRequestMade={this.state.weeklyRequestMade}
                            />
                          )
                        );
                      } else {
                        return (
                          <div
                            style={{
                              marginTop: '250px',
                              display: 'flex',
                              height: '100vh',
                              justifyContent: 'center'
                            }}
                            className="loading"
                          >
                            <h2>Loading...</h2>
                          </div>
                        );
                      }
                  };
                  return (
                    <Route
                      key={page.id}
                      exact
                      path={path()}
                      component={() => {
                        return (
                          <StyledComponent>
                            <Component />
                          </StyledComponent>
                        );
                      }}
                    />
                  );
                })}
              {weeklyRequestMade ? (
                <Route
                  exact
                  path={`/weekly/:weeklyPost`}
                  component={({ match }) => {
                    if (weeklyRequestMade) {
                      return (
                        <WeeklyPost
                          match={match}
                          weeklyPost={filterByPost(match)}
                          weeklyPosts={this.state.weeklyPosts}
                        />
                      );
                    } else {
                    }
                  }}
                />
              ) : (
                <Loading />
              )}
              {weeklyRequestMade ? (
                <Route
                  exact
                  path={`/weekly/authors/:author`}
                  component={({ match }) => {
                    if (weeklyRequestMade) {
                      return <Author weeklyByAuthor={filterByAuthor(match)} />;
                    } else {
                    }
                  }}
                />
              ) : (
                <Loading />
              )}
              {weeklyRequestMade ? (
                <Route
                  exact
                  path={`/weekly/categories/:category`}
                  component={({ match }) => {
                    if (weeklyRequestMade) {
                      return (
                        <WeeklyCategory
                          match={match}
                          categories={this.state.categories}
                          weeklyByCategory={filterByCategory(match)}
                        />
                      );
                    } else {
                    }
                  }}
                />
              ) : (
                <Loading />
              )}
              {weeklyRequestMade ? (
                <Route
                  exact
                  path={`/weekly/tags/:tagName`}
                  component={({ match }) => {
                    if (weeklyRequestMade) {
                      return (
                        <Weekly
                          match={match}
                          tags={this.state.tags}
                          weeklyByTag={filterByTag(match)}
                        />
                      );
                    } else {
                    }
                  }}
                />
              ) : (
                <Loading />
              )}
              {weeklyRequestMade && <Route path="*" component={NotFound} />}
            </Switch>
            <Footer footer={this.state.footer} />
          </div>
        </Router>
      );
    }
  }
}

let StyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  min-height: 600px;

  @media ${mediumUp} {
    width: 100%;
  }

  .image-wrapper {
    display: flex;
    @media ${tiny} {
      flex-direction: column;
    }
    img {
      margin: 20px;
      @media ${mediumUp} {
        margin: 20px 50px;
      }
    }

    img:nth-child(2) {
      margin-bottom: 50px;
    }
  }

  .subtitle {
    text-align: center;
    max-width: 300px;
    @media ${mediumUp} {
      width: 550px;
    }
  }
`;

export default App;
