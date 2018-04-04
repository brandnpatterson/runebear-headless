import React, { Component } from 'react'
import { title } from './util/helpers'

// styles
import styled from 'styled-components'
import media from './styles/media'
import page from './styles/page'

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

    .alignright {
        margin-top: -30px;
    }

    img {
        height: 200px;
        width: 200px;

        ${media.$mediumUp} {
            height: 400px;
            width: 400px;
        }
    }

    {/* boilerplate styling for all pages */}
    ${page}
`

export default Page
