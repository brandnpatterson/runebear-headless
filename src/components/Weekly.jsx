import React, { Component } from 'react'
import { string } from 'prop-types'
import { getWeeklyPosts } from '../api'
import styled from 'styled-components'

// styles
import { mediumUp, tiny } from '../util/media'
import { weekly } from '../styles'

let propTypes = {
    __html: string.isRequired,
    pageClass: string.isRequired, 
    pageTitle: string.isRequired
}

class Weekly extends Component {
    
    componentDidMount() {
        getWeeklyPosts()
            .then(data => {
                const weekly_posts = data.posts.map(post => {
                    return {
                        title: post.title.rendered,
                        content: post.content.rendered,
                        categories: post.categories,
                        tags: post.tags
                    }
                })

                console.log(weekly_posts)
            })
    }

    render() {
        const { __html, pageClass, pageTitle } = this.props
        document.title = `${pageTitle} | Rune Bear`

        return (
            <StyledPage className={pageClass} dangerouslySetInnerHTML={{ __html }} />
        )
    }
}

let StyledPage = styled.div `
    {/* styling for all pages */}
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    margin: 50px auto;

    @media ${mediumUp} {
        margin: 82px auto;
        width: 100%;
    }

    .image-wrapper {
        display: flex;

        @media ${tiny} {
            flex-direction: column;
        }

        img {
            margin: 20px;

            @media ${mediumUp} {
                margin: 20px 50px;
            }
        }

        img:nth-child(2) {
            margin-bottom: 50px;
        }
    }

    .subtitle {
        text-align: center;
        max-width: 300px;

        @media ${mediumUp} { 
            width: 550px;
        }
    }

    h1, h2, h3, h4 {
        max-width: 550px;
    }

    h1 {
        font-size: 26px;

        @media ${mediumUp} {
            font-size: 30px;
        }
    }

    h2 {
        font-size: 22px;

        @media ${mediumUp} {
            font-size: 26px;
        }
    }

    h3 {
        font-size: 20px;

        @media ${mediumUp} {
            font-size: 22px;
        }
    }

    h4 {
        font-size: 18px;

        @media ${mediumUp} {
            font-size: 20px;
        }
    }

    img {
        height: 200px;
        width: 200px;

        @media ${mediumUp} {
            height: 400px;
            width: 400px;
        }
    }

    {/* styling for weekly page */}    
    ${weekly}
`

Weekly.propTypes = propTypes

export default Weekly
