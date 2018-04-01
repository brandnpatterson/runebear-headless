import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import Submit from './components/Submit'
import Weekly from './components/Weekly'
import Quarterly from './components/Quarterly'
import About from './components/About'
import NotFound from './components/NotFound'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/submit' component={Submit} />
          <Route exact path='/weekly' component={Weekly} />
          <Route exact path='/quarterly' component={Quarterly} />
          <Route exact path='/about' component={About} />
          <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
