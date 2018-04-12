import React from 'react'
import styled from 'styled-components'
import { capitalizeFirstLetter, title } from '../util/helpers'

// styles
import media from '../util/media'
import { comingSoon, about, page, submit } from '../styles/index'

let Page = ({ pageClass, __html}) => {
    document.title = `${capitalizeFirstLetter(pageClass)} | ${title}`

    return (
        <StyledPage className={pageClass} dangerouslySetInnerHTML={{ __html }} />
    )
}

let StyledPage = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    margin: 50px auto;

    ${media.mediumUp} {
        margin: 82px auto;
    }

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
