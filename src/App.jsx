import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { lowerAndDash, pages } from './util/helpers'
import axios from 'axios'

import Header from './components/Header'
import Footer from './components/Footer'
import Page from './components/Page'
import NotFound from './components/NotFound'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      footer: null,
      header: null,
      pages: null,
      routes: null,
    }
  }

  componentDidMount() {    
    axios.get(pages)
      .then(res => {
        // return header header
        const header = res.data.filter(d => {
          return d.title.rendered !== 'Footer' && d.title.rendered !== 'Header'
        })
        .sort((a, b) => a.id - b.id)
        .map(d => d.title.rendered)

        // return footer
        let footer = res.data.filter(d => {
          return d.id === 43
        }).map(d => d.content.rendered)
        footer = footer[0]

        // return all pages from api that are not the header and footer
        const pages = res.data.filter(d => {
          return d.title.rendered !== 'Footer' && d.title.rendered !== 'Header'
        }).map(d => d)
        
        this.setState({ footer })
        this.setState({ pages })
        this.setState({ header: header })
        this.setState({
          routes: this.createRoutes()
        })
      })
      .catch(err => console.log(err))
  }

  createRoutes() {
    const { pages } = this.state

    const routes = pages.map(page => {
      const pageClass = lowerAndDash(page.title.rendered)
      let pagePath
      let html = page.content.rendered

      if (page.title.rendered === 'Home') {
        pagePath = '/'
      } else {
        pagePath = '/' + pageClass
      }

      return (
        <Route key={page.id} exact path={pagePath} component={() => (
          <Page __html={html} pageClass={pageClass} />
        )} />
      )
    })

    return routes
  }
  
  render() {
    const { footer, header, pages, routes } = this.state

    return (
      <div id="wrapper">
        {header &&
          <Header header={header} />
        }
        <Switch>
          {pages && routes}
          {pages && <Route path="*" component={NotFound} />}
        </Switch>
        {footer && 
          <Footer footer={footer} />
        }
      </div>
    )
  }
}

export default App
