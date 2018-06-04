import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'
import { gray } from '../util/color'
import { garamond } from '../util/font'
import { mediumUp, largeUp } from '../util/media'

let propTypes = {
  __html: string.isRequired,
  pageClass: string.isRequired,
  pageTitle: string.isRequired
}

let Submit = ({ __html, pageClass, pageTitle }) => {
  document.title = `${pageTitle} | Rune Bear`

  return (
    <StyledSubmit className={pageClass} dangerouslySetInnerHTML={{ __html }} />
  )
}

let StyledSubmit = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 0 auto;

  @media ${mediumUp} {
    flex-direction: row;
  }

  @media ${largeUp} {
    max-width: 80%;
  }

  .card {
    border: 1px solid ${gray};
    display: flex;
    flex-direction: column;
    align-items: left;
    margin: 50px auto;
    padding: 0 30px 50px;
    width: 100%;

    @media ${mediumUp} {
      margin: 50px 30px;
      width: 50%;
    }

    h1 {
      font-family: ${garamond}, serif;
      font-size: 110px;
      font-weight: bold;
      padding-top: 0;
      display: block;
      margin: 30px auto;
    }

    p {
      margin-bottom: 24px;
    }
  }
`

Submit.propTypes = propTypes

export default Submit
