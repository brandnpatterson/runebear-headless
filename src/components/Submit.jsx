import React, { Component } from 'react'
import { title } from './util/helpers'

class Submit extends Component {
  constructor() {
    super()
    this.state = {
      html: null
    }
  }

  componentWillMount() {
    document.title = `Submit | ${title}`

    this.props.pages.map(page => {
      if (page.id === Number(this.props.id)) {
        return this.setState({
          html: page.content.rendered
        })
      } else {
        return null
      }
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
