import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
import FilterByAuthor from './pages/FilterByAuthor'
import FilterByTag from './pages/FilterByTag'
import WeeklyPost from './pages/WeeklyPost'
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
      weeklyPosts: null
    }
  }

  componentDidMount() {
    let allAuthors = []
    let allTags = []

    getPages()
      .then(data => {
        let { pages, header, footer } = data
        
        this.setState({ pages, header, footer: footer[0] })
      })

    getWeeklyPosts()
      .then(weeklyPosts => {
        this.setState({ weeklyPosts })
      })
      .then(() => {
        let { weeklyPosts } = this.state

        if (weeklyPosts.length === 0) {
          return
        } else {
          return weeklyPosts.map(post => {
            let tagNames = []

            getTaxonomy('tags', post.id)
              .then(data => {
                if (data) {
                  return data.map(tag => {
                    tagNames.push(tag.name)
                    allTags.push(tag.name)
                    allTags = [...new Set(allTags)].sort()

                    return post.tagNames = tagNames
                  })
                } else {
                  return allTags.push('')
                }
              })
              .then(() => this.setState({
                tags: allTags,
                weeklyPosts
              }))

            return getTaxonomy('post_author', post.id)
              .then(data => {
                if (data && data[0] && data[0].name) {
                  let checkAndAdd = name => {
                    let found = allAuthors.some((el) => el.name === name)

                    if (!found) {
                      allAuthors.push({
                        name: data[0].name,
                        description: data[0].description,
                        slug: data[0].slug
                      })
                    }
                  }

                  checkAndAdd(data[0].name)

                  post.author = data[0].name
                  post.authorSlug = data[0].slug
                  post.authorDesc = data[0].description
                } else {
                  post.author = ''
                  post.authorSlug = ''
                  post.authorDesc = ''
                }
              })
              .then(() => {
                this.setState({
                  authors: allAuthors,
                  weeklyPosts
                })
              })
          })
        }
      })
  }

  render() {
    let { pages, header, footer, tags, weeklyPosts } = this.state

    return (
      <Router>
        {weeklyPosts && header && footer && <div id="wrapper">
          <Header header={header} />
          <Switch>
            {pages.map(page => {
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
                    weeklyPosts &&
                    <WeeklyPosts
                      __html={page.content.rendered}
                      pageClass={page.slug}
                      pageTitle={page.title.rendered}
                      weeklyPosts={weeklyPosts}
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
            {weeklyPosts.lenght > 0 &&
              <div className="weekly-routes">
                <Route exact path={`/weekly/:weeklyPost`} component={({ match }) => (
                  <WeeklyPost
                    match={match}
                    weeklyPost={
                      weeklyPosts.map(post => {
                        if (post.slug === match.params.weeklyPost) {
                          return post
                        } else return null
                      })
                    }
                    weeklyPosts={weeklyPosts}
                  />
                )} />
                <Route exact path={`/authors/:author`} render={({ match }) => (
                  <FilterByAuthor
                    match={match}
                    weeklyPosts={
                      weeklyPosts.map(post => {
                        if (post.authorSlug === match.params.author) {
                          return post
                        } else return null
                      })
                    }
                  />
                )} />
                <Route exact path={`/tags/:tagName`} render={({ match }) => (
                  <FilterByTag
                    match={match}
                    tags={tags}
                    weeklyPosts={
                      weeklyPosts.map(post => {
                        if (post.tagNames) {
                          return post.tagNames.map(tag => {
                            if (tag === match.params.tagName) {
                              return post
                            } else return null
                          })
                        } else return null
                      })
                    }
                  />
                )} />
              </div>
            }
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer footer={footer} />
        </div>}
      </Router>
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
