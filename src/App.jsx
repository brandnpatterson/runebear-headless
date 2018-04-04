import React from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header'
import Footer from './components/Footer'
import NotFound from './components/NotFound'

import Page from './components/Page'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      navbar: null,
      pages: null,
      routes: null,
    }
  }

  componentDidMount() {
    const pages = 'http://runebear.localhost/wp-json/wp/v2/pages'
    
    axios.get(pages)
      .then(res => {
        // listen for navbar from api
        const navbar = res.data.filter(d => {
          if (d.id !== 56) return null
          return d
          // replace all html and new lines with an empty string
          // split each string at the comma and trim empty space
        }).map(d => {
          const split = d.content.rendered.replace(/<(.|\n)*?>/g, '').split(',')
          const trim = split.map(s => s.trim())

          return trim
        })

        // listen for pages from api
        const pages = res.data.filter(d => {
          if (d.title.rendered === 'Footer' || d.title.rendered === 'Header') return null
          return d
        }).map(d => d)
        
        this.setState({ pages })
        this.setState({ navbar: navbar[0] })
        this.setState({
          routes: this.createRoutes()
        })
      })
      .catch(err => console.log(err))
  }

  createRoutes() {
    const { pages } = this.state

    const lowerAndDash = e => e.toLowerCase().replace(/\s+/g, '-')

    const routes = pages.map((nav, i) => {
      let pageName
      const pageClass = lowerAndDash(nav.title.rendered)
      const pageId = nav.id

      if (nav.title.rendered === 'Home') {
        pageName = '/'
      } else {
        pageName = '/' + pageClass
      }

      const route = 
      <Route key={i} exact path={pageName} component={() => (
        <Page id={pageId} pages={pages} class={pageClass} />
      )} />

      return route
    })

    return routes
  }
  
  render() {
    const { navbar, pages, routes } = this.state

    return (
      <div id="wrapper">
        {navbar &&
          <Header navbar={navbar} />
        }
        <Switch>
          {pages && routes}
          {pages && <Route path="*" component={NotFound} />}
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App
