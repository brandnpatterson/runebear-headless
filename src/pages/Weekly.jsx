import React from 'react'
import styled from 'styled-components'
import { black } from '../util/color'
import { garamond } from '../util/font'
import { mediumUp } from '../util/media'


let Weekly = ({ __html, pageClass, pageTitle, weekly }) => {

  console.log(weekly)

  return (
    <div className="weekly-wrapper">
      <StyledWeekly className={pageClass} dangerouslySetInnerHTML={{ __html }} />
      {/* <div className="card">posts</div> */}
    </div>
  )
}

let StyledWeekly = styled.div `
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

  .card {
    border: 1px solid ${black};
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
  }
`

export default Weekly
