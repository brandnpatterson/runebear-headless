import React from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Header from './components/Header'
import Home from './components/Home'
import Submit from './components/Submit'
import About from './components/About'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import ComingSoon from './components/ComingSoon'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      pages: null
    }
  }

  componentDidMount() {
    const pages = 'http://runebear.localhost/wp-json/wp/v2/pages'
    
    axios.get(pages)
      .then(res => {
        const pages = res.data
        this.setState({ pages })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { pages } = this.state
    return (
      <div className="content">
        <Header />
        <Switch>
          {pages &&
            <Route exact path='/' component={() => (
              <Home id="1" pages={pages} />
            )} />
          }
          {pages &&
            <Route exact path='/submit' component={() => (
              <Submit id="3" pages={pages} />
            )} />
          }
          {pages &&
            <Route exact path='/weekly' component={() => (
              <ComingSoon id="5" pages={pages} />
            )} />
          }
          {pages &&
            <Route exact path='/quarterly' component={() => (
              <ComingSoon id="5" pages={pages} />
            )} />
          }
          {pages && 
            <Route exact path='/about' component={() => (
              <About id="7" pages={pages} />
            )} />
          }
          {pages &&
            <Route path="*" component={NotFound} />
          }
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default App
