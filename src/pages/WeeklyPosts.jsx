import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { gray } from '../util/color'
import { garamond } from '../util/font'
import { mediumUp } from '../util/media'

let WeeklyPosts = ({ __html, authors, pageClass, pageTitle, weekly_posts }) => {
  document.title = `${pageTitle} | Rune Bear`

  return (
    <StyledWeeklyWrapper>
      <StyledWeeklyPosts className={pageClass} dangerouslySetInnerHTML={{ __html }} />
      {weekly_posts.map((post, postIndex) => {
        let trimmed = post.content.rendered.substr(0, 345);
        let excerpt = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')))
    
        return (
          <StyledPost key={post.id}>
            <h2 className="card-title">{post.title.rendered}</h2>
            <div className="card-content">
              <p dangerouslySetInnerHTML={{ __html: excerpt }} />
              <Link className="card-read-more" to={`/weekly/${post.slug}`}>...Read more {post.title.rendered}</Link>
            </div>
            <div className="card-footer">
              <Link to={`authors/${post.author_slug}`}>
                <h2 className="card-author">{post.author}</h2>
              </Link>
              <div className="card-tags">
                {post.tag_names && post.tag_names.map((tag, index, { length }) => {
                  return <Link to={`/tags/${tag}`} key={index}>{'#' + tag}&nbsp;</Link>
                })}
              </div>
            </div>
          </StyledPost>
        )
      })}
    </StyledWeeklyWrapper>
  )
}

let StyledWeeklyWrapper = styled.div `
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

let StyledWeeklyPosts = styled.div `
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
  border-top: 1px solid ${gray};
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;
  padding: 100px 0 50px;

  @media ${mediumUp} {
    border: 1px solid ${gray};
    margin: 50px;
    padding: 100px 50px 50px;
    width: 70%;
  }

  .card-title {
    font-family: ${garamond};
    font-weight: bold;
    position: absolute;
    right: 50px;
    top: 40px;
    text-align: right;
    text-transform: uppercase;
  }

  .card-read-more {
    display: block;
    text-align: right;
  }

  .card-footer {
    border: none;
    display: flex;
    flex-direction: column;
    margin-left: 22px;
  }
`

export default WeeklyPosts
