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
// import FilterByAuthor from './pages/FilterByAuthor'
// import FilterByWeeklyPost from './pages/FilterByWeeklyPost'
import FilterByTag from './pages/FilterByTag'
import Weekly from './pages/Weekly'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      pages: null,
      header: null,
      footer: null,
      tags: null,
      weekly: null
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
      .then(weekly => this.setState({ weekly }))
      .then(() => {
        let { weekly } = this.state
        
        return weekly.map(post => {
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
                return false
              }
            })
            .then(() => this.setState({
              tags: all_tags, 
              weekly 
            }))

          return getTaxonomy('post_author', post.id)
            .then(data => {
              if (data && data[0] && data[0].name) {
                post.author = data[0].name
                all_authors.push(data[0].name)
              } else {
                post.author = ''
              }
              
              all_authors = [...new Set(all_authors)].sort()
            })
            .then(() => this.setState({
              authors: all_authors,
              weekly 
            }))
        })
      })
  }

  render() {
    let { authors, pages, header, footer, tags, weekly } = this.state
    
    return (
      <div id="wrapper">
        {weekly && tags && authors && <Header header={header} />}
        <Switch>
          {weekly && tags && authors && pages.map(page => {
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
                  weekly && 
                  <Weekly
                    __html={page.content.rendered}
                    pageClass={page.slug}
                    pageTitle={page.title.rendered}
                    weekly={weekly}
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
          {/* {weekly && authors && <Route exact path={`/weekly/:weeklyPost`} render={({ match }) => (
            <FilterByWeeklyPost
              match={match}
              weekly_post={
                weekly.map(post => {
                  if (post.slug === match.params.weeklyPost) {
                    return post
                  } else return null
                })
              }
            />
          )} />} */}
          {/* {weekly && tags && authors && <Route exact path={`/authors/:author`} render={({ match }) => (
            <FilterByAuthor
              match={match}
              authors={authors}
              weekly={
                weekly.map(post => {
                  if (lowerAndDash(post.author) === match.params.author) {
                    return post
                  } else return null
                })
              }
            />
          )} />} */}
          {weekly && tags && authors && <Route exact path={`/tags/:tagName`} render={({ match }) => (
            <FilterByTag
              match={match}
              tags={tags}
              weekly={
                weekly.map(post => {
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
          {weekly && tags && authors && <Route path="*" component={NotFound} />}
        </Switch>
        {weekly && tags && authors && <Footer footer={footer} />}
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
