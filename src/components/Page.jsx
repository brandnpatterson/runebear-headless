import React, { Component } from 'react'
import styled from 'styled-components'

import { title } from './util/helpers'

class Page extends Component {
    constructor() {
        super()
        this.state = {
            html: null
        }
    }

    componentWillMount() {
        document.title = `Page | ${title}`

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
            <StyledContent dangerouslySetInnerHTML={{
                __html: this.state.html
            }} />
        )
    }
}

const StyledContent = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    margin: 100px auto;
    width: 80%;

    p {
        text-align: center;
    }

    h1, h2, h3, h4 {
        font-size: 30px;
        margin-bottom: 30px;
    }
`

export default Page
