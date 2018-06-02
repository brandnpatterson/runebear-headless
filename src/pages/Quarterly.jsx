import React from 'react'
import styled from 'styled-components'
import { mediumUp } from '../util/media'

let Quarterly = ({ __html, pageClass, pageTitle }) => {
  document.title = `${pageTitle} | Rune Bear`

  return (
    <StyledQuarterly className={pageClass} dangerouslySetInnerHTML={{ __html }} />
  )
}

let StyledQuarterly = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  @media ${mediumUp} {
    flex-direction: row;
    margin-top: 120px;
    max-width: 900px;
  }

  .speech-bubble-wrapper {
    position: relative;
  }

  .speech-bubble {        
    @media ${mediumUp} {
      margin-top: -120px;
    }
  }

  .coming-soon-text {
    position: absolute;
    left: 50px;
    top: 70px;

    @media ${mediumUp} {
      font-size: 30px;
      left: 110px;
      top: 25px;
    }
  }
`

export default Quarterly
