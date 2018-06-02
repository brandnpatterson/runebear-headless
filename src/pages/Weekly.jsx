import React from 'react'
import styled from 'styled-components'
import { gray } from '../util/color'
import { garamond } from '../util/font'
import { mediumUp } from '../util/media'


let Weekly = ({ __html, pageClass, pageTitle, weekly }) => {

  let posts = () => {
    return weekly.map(post => {
      let title = post.title.rendered
      let content = post.content.rendered

      return (
        <StyledPost key={post.id}>
          <div className="card-title">
            <h2>{title}</h2>
          </div>
          <p
            className="card-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </StyledPost>
      )
    })
  }

  return (
    <StyledWeeklyWrapper >
      <StyledWeekly className={pageClass} dangerouslySetInnerHTML={{ __html }} />
      {weekly && posts()}
    </StyledWeeklyWrapper>
    
  )
}

let StyledWeeklyWrapper = styled.div `
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

let StyledWeekly = styled.div `
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

let StyledPost = styled.div `
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
`

export default Weekly
