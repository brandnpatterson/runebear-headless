import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { mediumUp, tiny } from './util/media'
import { getTaxonomy, getPages, getWeeklyPosts } from './api'

import Header from './components/Header'
import Footer from './components/Footer'
import NotFound from './components/NotFound'

import About from './pages/About'
import Home from './pages/Home'
import Quarterly from './pages/Quarterly'
import Submit from './pages/Submit'
import WeeklyPost from './pages/WeeklyPost'
import FilterByAuthor from './pages/FilterByAuthor'
import FilterByTag from './pages/FilterByTag'
import WeeklyPosts from './pages/WeeklyPosts'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      authors: [],
      pages: null,
      header: null,
      footer: null,
      tags: null,
      weekly_posts: null
    }
  }

  componentDidMount() {
    let all_authors = []
    let all_tags = []
        
    getPages()
      .then(data => {
        let { pages, header, footer } = data

        this.setState({ pages, header, footer: footer[0] })
      })

    getWeeklyPosts()
      .then(weekly_posts => this.setState({ weekly_posts }))
      .then(() => {
        let { weekly_posts } = this.state
        
        return weekly_posts.map(post => {
          let tag_names = []
          
          getTaxonomy('tags', post.id)
            .then(data => {
              if (data) {
                return data.map(tag => {
                  tag_names.push(tag.name)
                  all_tags.push(tag.name)
                  all_tags = [...new Set(all_tags)].sort()

                  return post.tag_names = tag_names
                })
              } else {
                return all_tags.push('')
              }
            })
            .then(() => this.setState({
              tags: all_tags, 
              weekly_posts 
            }))

          return getTaxonomy('post_author', post.id)
            .then(data => {
              if (data && data[0] && data[0].name) {
                let checkAndAdd = name => {
                  let found = all_authors.some((el) => el.name === name)

                  if (!found) {
                    all_authors.push({
                      name: data[0].name,
                      description: data[0].description,
                      slug: data[0].slug
                    })
                  }
                }

                checkAndAdd(data[0].name)

                post.author = data[0].name
                post.author_slug = data[0].slug
                post.author_description = data[0].description
              } else {
                post.author = ''
                post.author_slug = ''
                post.author_description = ''
              }
            })
            .then(() => {
              this.setState({
                authors: all_authors,
                weekly_posts
              })
            })
        })
      })
  }

  render() {
    let { authors, pages, header, footer, tags, weekly_posts } = this.state
    
    console.log(authors)

    return (
      <div id="wrapper">
        {weekly_posts && tags && authors && <Header header={header} />}
        <Switch>
          {weekly_posts && tags && authors && pages.map(page => {
            let path = () => page.title.rendered === 'Home' ? '/' : '/' + page.slug

            let Component = () => {
              if (page.title.rendered === 'About')
                return (
                  <About
                    __html={page.content.rendered}
                    pageClass={page.slug}
                    pageTitle={page.title.rendered}
                  />
                )
              if (page.title.rendered === 'Home')
                return (
                  <Home
                    __html={page.content.rendered}
                    pageClass={page.slug}
                    pageTitle={page.title.rendered}
                  />
                )
              if (page.title.rendered === 'Quarterly')
                return (
                  <Quarterly
                    __html={page.content.rendered}
                    pageClass={page.slug}
                    pageTitle={page.title.rendered}
                  />
                )
              if (page.title.rendered === 'Submit')
                return (
                  <Submit
                    __html={page.content.rendered}
                    pageClass={page.slug}
                    pageTitle={page.title.rendered}
                  />
                )
              if (page.title.rendered === 'Weekly')
                return (
                  weekly_posts && 
                  <WeeklyPosts
                    __html={page.content.rendered}
                    pageClass={page.slug}
                    pageTitle={page.title.rendered}
                    weekly_posts={weekly_posts}
                  />
                )
            }

            return (
              <Route key={page.id} exact path={path()} component={() => (
                <StyledComponent>
                  <Component />
                </StyledComponent>
              )} />
            )
          })}
          {weekly_posts && tags && authors &&
          <Route exact path={`/weekly/:weeklyPost`} component={({ match }) => (
            <WeeklyPost
              match={match}
              weekly_post={
                weekly_posts.map(post => {
                  if (post.slug === match.params.weeklyPost) {
                    return post
                  } else return null
                })
              }
              weekly_posts={weekly_posts}
            />
          )} />}
          {weekly_posts && tags && authors && 
          <Route exact path={`/authors/:author`} render={({ match }) => (
            <FilterByAuthor
              match={match}
              weekly_posts={
                weekly_posts.map(post => {
                  if (post.author_slug === match.params.author) {
                    return post
                  } else return null
                })
              }
            />
          )} />}
          {weekly_posts && tags && authors && 
          <Route exact path={`/tags/:tagName`} render={({ match }) => (
            <FilterByTag
              match={match}
              tags={tags}
              weekly_posts={
                weekly_posts.map(post => {
                  if (post.tag_names) {
                    return post.tag_names.map(tag => {
                      if (tag === match.params.tagName) {
                        return post
                      } else return null
                    })
                  } else return null
                })
              }
            />
          )} />}
          {weekly_posts && tags && authors && <Route path="*" component={NotFound} />}
        </Switch>
        {weekly_posts && tags && authors && <Footer footer={footer} />}
      </div>
    )
  }
}

let StyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;

  @media ${mediumUp} {
    margin: 82px auto;
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

  h1, 
  h2, 
  h3, 
  h4 {
    max-width: 550px;
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
      font-size: 26px;
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
`

export default App
