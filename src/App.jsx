import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Submit from './components/Submit'
import About from './components/About'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import ComingSoon from './components/ComingSoon'

const App = () => {
  return (
    <div className="content">
      <Header />
      <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/submit' component={Submit} />
          <Route exact path='/weekly' component={ComingSoon} />
          <Route exact path='/quarterly' component={ComingSoon} />
          <Route exact path='/about' component={About} />
          <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
