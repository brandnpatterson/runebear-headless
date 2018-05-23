import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { getPages } from './api'
import { lowerAndDash } from './util/helpers'

import Page from './components/Page'
import Header from './components/Header'
import Footer from './components/Footer'
import NotFound from './components/NotFound'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      pages: null,
      header: null,
      footer: null,
      routes: null
    }
  }

  componentDidMount() {   
    getPages()
      .then(data => {
        let { pages, header, footer } = data
        this.setState({ pages, header, footer })
      })
      .then(() => this.createRoutes())
  }

  createRoutes() {
    let { pages } = this.state

    let routes = pages.map(page => {
      let pageClass = lowerAndDash(page.title.rendered)
      let pagePath = () => page.title.rendered === 'Home' ? '/' : '/' + pageClass

      return (
        <Route 
          key={page.id}
          exact path={pagePath()} 
          component={() => (
            <Page
              __html={page.content.rendered} 
              pageClass={pageClass} 
              pageTitle={page.title.rendered}
            />
          )
        } />
      )
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

export default App
