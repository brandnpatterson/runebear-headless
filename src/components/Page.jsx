import React, { Component } from 'react'
import { capitalizeFirstLetter, title } from '../util/helpers'

// styles
import media from '../util/media'
import styled from 'styled-components'
import page from '../styles/page'
import { comingSoon, about, submit } from '../styles/index'

class Page extends Component {
    constructor() {
        super()
        this.state = {
            html: null
        }
    }

    componentWillMount() {
          const { id, pageClass, pages } = this.props

        document.title = `${capitalizeFirstLetter(pageClass)} | ${title}`

        pages.map(page => {
            if (page.id === Number(id)) {
                return this.setState({
                    html: page.content.rendered
                })
            } else {
                return null
            }
        })
    }

    render() {
        const { pageClass } = this.props

        return (
            <StyledContent className={pageClass} dangerouslySetInnerHTML={{
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

    img {
        height: 200px;
        width: 200px;

        ${media.mediumUp} {
            height: 400px;
            width: 400px;
        }
    }

    {/* boilerplate styling for all pages */}
    ${page}

    {/* styling for submit page */}
    ${submit}

    {/* styling for about page */}
    ${about}

    {/* styling for quarterly and weekly pages */}
    ${comingSoon}
`

export default Page
