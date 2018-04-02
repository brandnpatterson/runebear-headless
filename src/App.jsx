import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Page from './components/Page'
import NotFound from './components/NotFound'

const App = () => (
  <div className="content">
    <Header changeNumber={this.changeNumber} />
    <Switch>
      <Route exact path='/' component={() => <Page name="Home" number="1" /> }/>
      <Route exact path='/submit' component={() => <Page name="Submit" number="3" />} />
      <Route exact path='/weekly' component={() => <Page name="Weekly" number="5" />} />
      <Route exact path='/quarterly' component={() => <Page name="Quarterly" number="5" />} />
      <Route exact path='/about' component={() => <Page name="About" number="7" />} />
      <Route path="*" component={NotFound} />
    </Switch>
    <Footer />
  </div>
)

export default App
