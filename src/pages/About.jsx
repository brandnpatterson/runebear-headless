import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'
import { garamond } from '../util/font'
import { black, gray } from '../util/color'
import { mediumUp } from '../util/media'

let propTypes = {
  __html: string.isRequired,
  pageClass: string.isRequired,
  pageTitle: string.isRequired
}

let About = ({ __html, pageClass, pageTitle }) => {
  document.title = `${pageTitle} | Rune Bear`

  return (
    <StyledAbout className={pageClass} dangerouslySetInnerHTML={{ __html }} />
  )
}

let StyledAbout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .featured-hero {
    align-items: center;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;

    @media ${mediumUp} {
      flex-direction: row;
      width: 650px;
    }

    h1 {
      font-family: ${garamond};
      font-size: 70px;
      margin-top: 0;

      @media ${mediumUp} {
        font-size: 100px;
        margin-top: 55px;
      }
    }

    img {
      height: 200px;
      width: 200px;
    }
  }

  .container {
    border: 1px solid ${gray};
    margin: 50px auto;
    max-width: 950px;
    padding: 30px 50px 50px;
    width: 100%;

    h1,
    h2,
    h3,
    h4 {
      font-family: ${garamond};
    }

    p {
      @media ${mediumUp} {
        padding-top: 10px;
      }
    }

    @media ${mediumUp} {
      display: flex;
      justify-content: space-around;
      width: 1100px;
    }
  }

  .content-inner {
    h1 {
      font-size: 26px;
      margin-bottom: 0;
    }

    h2 {
      font-size: 20px;
      margin-bottom: 30px;
    }

    h1,
    h2 {
      max-width: 100%;
      text-align: right;
    }
  }

  hr {
    background: ${black};
    height: 3px;
    margin-top: 30px;
    width: 300px;
  }
`

About.propTypes = propTypes

export default About
