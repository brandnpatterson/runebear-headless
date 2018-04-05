import React from 'react'
import { capitalizeFirstLetter, title } from '../util/helpers'

// styles
import media from '../util/media'
import styled from 'styled-components'
import { comingSoon, about, page, submit } from '../styles/index'

const Page = ({ pageClass, html}) => {
    document.title = `${capitalizeFirstLetter(pageClass)} | ${title}`

    return (
        <StyledPage className={pageClass} dangerouslySetInnerHTML={{
            __html: html
        }} />
    )
}

const StyledPage = styled.div `
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

    {/* styling for all pages */}
    ${page}

    {/* styling for submit page */}
    ${submit}

    {/* styling for about page */}    
    ${about}

    {/* styling for quarterly and weekly pages */}    
    ${comingSoon}
`

export default Page
