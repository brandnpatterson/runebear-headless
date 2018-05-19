import React from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'
import { lowerAndDash } from './util/helpers'
import pages from './conf'

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
      routes: null
    }
  }

  componentDidMount() {   
    axios.get(pages)
      .then(res => {

        // return header header
        let header = res.data.filter(d => {
          return d.title.rendered !== 'Footer' && d.title.rendered !== 'Header'
        })
        .sort((a, b) => a.id - b.id)
        .map(d => d.title.rendered)

        // return footer
        let footer = res.data.filter(d => {
          return d.id === 12
        }).map(d => d.content.rendered)
        footer = footer[0]

        // return all pages from api that are not the header and footer
        let pages = res.data.filter(d => {
          return d.title.rendered !== 'Footer' && d.title.rendered !== 'Header'
        }).map(d => d)

        this.setState({ footer, header, pages })
      })
      .then(() => this.createRoutes())
      .catch(err => console.log(err))
  }

  createRoutes() {
    let { pages } = this.state

    let routes = pages.map(page => {
      let pageClass = lowerAndDash(page.title.rendered)
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

    this.setState({ routes })
  }
  
  render() {
    let { footer, header, pages, routes } = this.state

    console.log(footer);

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
