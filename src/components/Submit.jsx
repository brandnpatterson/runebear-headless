import React, { Component } from 'react'
import { page, title } from './util/helpers'
import getContent from './util/api'

const req = `${page}3`

class Submit extends Component {
  constructor() {
    super()
    this.state = {
      html: null
    }
  }

  componentWillMount() {
    document.title = `Submit | ${title}`
    getContent(req, (html) => {
      this.setState({ html })
    })
  }

  render() {
    return (
      <div className="content" dangerouslySetInnerHTML={{
        __html: this.state.html
      }} />
    )
  }
}

export default Submit
