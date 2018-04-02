import React, { Component } from 'react'
import { page, title } from './util/helpers'
import getContent from './util/api'

class Page extends Component {
    constructor() {
        super()
        this.state = {
            html: null
        }
    }

    componentDidMount() {
        const req = `${page}${this.props.number}`

        document.title = `${this.props.name} | ${title}`
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

export default Page
