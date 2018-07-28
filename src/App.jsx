import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { mediumUp, tiny } from './util/media';
import { getTaxonomy, getPages, getWeeklyPosts } from './api';

import About from './components/About';
import Author from './components/Author';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Loading from './components/common/Loading';
import NotFound from './components/NotFound';
import Quarterly from './components/Quarterly';
import Submit from './components/Submit';
import Weekly from './components/weekly/WeeklyTag';
import WeeklyCategory from './components/weekly/WeeklyCategory';
import WeeklyPost from './components/weekly/WeeklyPost';
import WeeklyPostsPage from './components/weekly/WeeklyPostsPage';

class App extends React.Component {
  state = {
    authors: [],
    pages: null,
    header: null,
    loading: true,
    footer: null,
    weekly_category_type: null,
    weekly_total_pages: null,
    weekly_page: 1,
    weekly_pages: {},
    weekly_posts: null,
    weekly_posts_all: null,
    weekly_requests_complete: false,
    weekly_tags: null
  };

  componentDidMount() {
    getPages().then(data => {
      this.setState({
        pages: data.pages,
        header: data.header,
        loading: false,
        footer: data.footer
      });

      this.getWeeklyPostsRequest();
    });
  }

  onSelectWeeklyPage = page => {
    window.scrollTo(0, 0);

    this.setState({
      weekly_page: page,
      weekly_posts: this.state.weekly_pages[page]
    });
  };

  onNextWeeklyPage = () => {
    window.scrollTo(0, 0);

    let nextPage = this.state.weekly_page + 1;

    this.setState({
      weekly_page: nextPage,
      weekly_posts: this.state.weekly_pages[nextPage]
    });
  };

  onPreviousWeeklyPage = () => {
    window.scrollTo(0, 0);

    let prevPage = this.state.weekly_page - 1;

    this.setState({
      weekly_page: prevPage,
      weekly_posts: this.state.weekly_pages[prevPage]
    });
  };

  getWeeklyPostsRequest = page => {
    let allAuthors = [];
    let allCategories = [];
    let allTags = [];

    getWeeklyPosts(page, '')
      .then(weeklyPosts => {
        this.setState({
          weekly_posts_all: weeklyPosts.data
        });
      })
      .then(() => {
        let { weekly_posts_all } = this.state;

        if (weekly_posts_all.length === 0) {
          return;
        } else {
          return weekly_posts_all.map(post => {
            let categoryType = [];
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
                  weekly_tags: allTags
                })
              );

            getTaxonomy('categories', post.id)
              .then(data => {
                if (data) {
                  return data.map(tag => {
                    categoryType.push(tag.name);
                    allCategories.push(tag.name);
                    allCategories = [...new Set(allCategories)].sort();

                    return (post.categoryType = categoryType);
                  });
                } else {
                  return allCategories.push('');
                }
              })
              .then(() => {
                this.setState({
                  weekly_category_type: allCategories
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
                let { weekly_pages } = this.state;
                let newArr = Array.from(weekly_posts_all);

                let i = 0;
                while (newArr.length) {
                  weekly_pages[i + 1] = newArr.splice(0, 4);
                  i++;
                }

                this.setState({
                  authors: allAuthors,
                  weekly_posts: this.state.weekly_pages[1],
                  weekly_requests_complete: true,
                  weekly_total_pages: Object.keys(this.state.weekly_pages)
                    .length
                });
              });
          });
        }
      });
  };

  render() {
    let { weekly_posts_all, weekly_requests_complete } = this.state;

    let filterByAuthor = match =>
      weekly_posts_all &&
      weekly_posts_all.filter(post => post.authorSlug === match.params.author);

    let filterByPost = match =>
      weekly_posts_all &&
      weekly_posts_all.filter(post => post.slug === match.params.weeklyPost);

    let filterByCategory = match => {
      let matchParam = match.params.category;

      return weekly_posts_all.filter(post => {
        if (post.categoryType && post.categoryType.indexOf(matchParam) > -1) {
          return post;
        } else return null;
      });
    };

    let filterByTag = match => {
      let matchParam = match.params.tagName;

      return (
        weekly_posts_all &&
        weekly_posts_all.filter(post => {
          if (post.tagNames && post.tagNames.indexOf(matchParam) > -1) {
            return post;
          } else return null;
        })
      );
    };

    return (
      <Router>
        <div id="router-container">
          {this.state.header ? (
            <div>
              <Header
                header={this.state.header}
                onSelectWeeklyPage={this.onSelectWeeklyPage}
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
                        if (weekly_requests_complete) {
                          return (
                            this.state.weekly_posts && (
                              <WeeklyPostsPage
                                __html={page.content.rendered}
                                onNextWeeklyPage={this.onNextWeeklyPage}
                                onPreviousWeeklyPage={this.onPreviousWeeklyPage}
                                onSelectWeeklyPage={this.onSelectWeeklyPage}
                                clearWeeklyPosts={this.clearWeeklyPosts}
                                pageClass={page.slug}
                                pageTitle={page.title.rendered}
                                weeklyPage={this.state.weekly_page}
                                weeklyPosts={this.state.weekly_posts}
                                weeklyTotalPages={this.state.weekly_total_pages}
                              />
                            )
                          );
                        } else {
                          return <Loading />;
                        }
                    };
                    return (
                      <Route
                        key={page.id}
                        exact
                        path={path()}
                        component={() => {
                          return (
                            <StyledComponent className="flex-center">
                              <Component />
                            </StyledComponent>
                          );
                        }}
                      />
                    );
                  })}
                {weekly_requests_complete ? (
                  <Route
                    exact
                    path={`/weekly/:weeklyPost`}
                    component={({ match }) => {
                      return (
                        <WeeklyPost
                          weeklyPost={filterByPost(match)}
                          weeklyPosts={this.state.weekly_posts_all}
                        />
                      );
                    }}
                  />
                ) : (
                  <Loading />
                )}
                {weekly_requests_complete ? (
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
                ) : (
                  <Loading />
                )}
                {weekly_requests_complete ? (
                  <Route
                    exact
                    path={`/weekly/categories/:category`}
                    component={({ match }) => {
                      return (
                        <WeeklyCategory
                          match={match}
                          categoryType={this.state.weekly_category_type}
                          weeklyByCategory={filterByCategory(match)}
                        />
                      );
                    }}
                  />
                ) : (
                  <Loading />
                )}
                {weekly_requests_complete ? (
                  <Route
                    exact
                    path={`/weekly/tags/:tagName`}
                    component={({ match }) => {
                      return (
                        <Weekly
                          match={match}
                          tags={this.state.weekly_tags}
                          weeklyByTag={filterByTag(match)}
                        />
                      );
                    }}
                  />
                ) : (
                  <Loading />
                )}
                {weekly_requests_complete && (
                  <Route path="*" component={NotFound} />
                )}
              </Switch>
              <Footer footer={this.state.footer} />
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </Router>
    );
  }
}

let StyledComponent = styled.div`
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

export default App;
