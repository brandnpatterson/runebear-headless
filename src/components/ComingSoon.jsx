import React, { Component } from 'react'
import { title } from './util/helpers'

class ComingSoon extends Component {
    constructor() {
        super()
        this.state = {
            html: null
        }
    }

    componentWillMount() {
        document.title = `Coming Soon | ${title}`
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

export default ComingSoon
