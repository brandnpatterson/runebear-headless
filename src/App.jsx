import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import { mediumUp, tiny } from './util/media'
import { getAuthor, getPages, getWeeklyPosts } from './api'

import Header from './components/Header'
import Footer from './components/Footer'
import NotFound from './components/NotFound'

import About from './pages/About'
import Home from './pages/Home'
import Quarterly from './pages/Quarterly'
import Submit from './pages/Submit'
import Weekly from './pages/Weekly'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      pages: null,
      header: null,
      footer: null,
      routes: null,
      weekly: null,
      weekly_ids: []
    }
  }

  componentDidMount() { 
    getPages()
      .then(data => {
        let { pages, header, footer } = data

        this.setState({ pages, header, footer: footer[0] })
      })
      .then(() => this.createRoutes())

    getWeeklyPosts()
      .then(data => {
        let { posts } = data
        
        let weekly_ids = data.posts.map(post => post.id)

        this.setState({ weekly: posts, weekly_ids })
      })
      .then(() => {
        let { weekly_ids } = this.state

        weekly_ids.map(id => {
          return getAuthor(id)
            .then(data => {
              console.log(data[0].name)
            })
        })
      })
  }

  createRoutes() {
    let { pages } = this.state

    let routes = pages.map(page => {
      let path = () => page.title.rendered === 'Home' ? '/' : '/' + page.slug
  
      if (page.title.rendered === 'About') {
        return <Route key={page.id} exact path={path()} component={() => (
            <StyledComponent>
              <About
                __html={page.content.rendered}
                pageClass={page.slug}
                pageTitle={page.title.rendered}
              />
            </StyledComponent>
        )} />
      } else if (page.title.rendered === 'Home') {
        return <Route key={page.id} exact path={path()} component={() => (
            <StyledComponent>
              <Home
                __html={page.content.rendered}
                pageClass={page.slug}
                pageTitle={page.title.rendered}
              />
            </StyledComponent>
        )} />
      } else if (page.title.rendered === 'Quarterly') {
        return <Route key={page.id} exact path={path()} component={() => (
            <StyledComponent>
              <Quarterly
                __html={page.content.rendered}
                pageClass={page.slug}
                pageTitle={page.title.rendered}
              />
            </StyledComponent>
        )} />
      } else if (page.title.rendered === 'Submit') {
        return <Route key={page.id} exact path={path()} component={() => (
            <StyledComponent>
              <Submit
                __html={page.content.rendered}
                pageClass={page.slug}
                pageTitle={page.title.rendered}
              />
            </StyledComponent>
        )} />
      } else if (page.title.rendered === 'Weekly') {
        return <Route key={page.id} exact path={path()} component={() => (
            <StyledComponent>
              <Weekly
                __html={page.content.rendered}
                pageClass={page.slug}
                pageTitle={page.title.rendered}
                weekly={this.state.weekly}
              />
            </StyledComponent>
        )} />
      } else { 
        return false 
      }
    })
  
    this.setState({ routes })
  }

  render() {
    let { pages, header, footer, routes } = this.state
    
    return (
      <div id="wrapper">
        {header && <Header header={header} />}
        <Switch>
          {pages && routes}
          {pages && <Route path="*" component={NotFound} />}
        </Switch>
        {footer && <Footer footer={footer} />}
      </div>
    )
  }
}

let StyledComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 50px auto;

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
