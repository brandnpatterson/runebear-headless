import React from 'react'
import { array, string } from 'prop-types'
import { Link } from 'react-router-dom'
import StyledPost from '../templates/StyledPost'
import styled from 'styled-components'
import { garamond } from '../util/font'
import { mediumUp } from '../util/media'

let propTypes = { 
  __html: string.isRequired, 
  pageClass: string.isRequired, 
  pageTitle: string.isRequired, 
  weeklyPosts: array.isRequired
}

let WeeklyPosts = ({ __html, pageClass, pageTitle, weeklyPosts }) => {
  document.title = `${pageTitle} | Rune Bear`

  return (
    <StyledWeeklyWrapper>
      <StyledWeeklyPosts className={pageClass} dangerouslySetInnerHTML={{ __html }} />
      { // if there are weekly posts
        weeklyPosts.map((post, postIndex) => {
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
              <Link to={`authors/${post.authorSlug}`}>
                <p className="card-author">{post.author}</p>
              </Link>
              <div className="card-tags">
                {post.tagNames && post.tagNames.map((tag, index, { length }) => {
                  return <Link to={`/tags/${tag}`} key={index}>{'#' + tag}&nbsp;</Link>
                })}
              </div>
            </div>
          </StyledPost>
        )
        // ./ if there are weekly posts
      })}
    </StyledWeeklyWrapper>
  )
}

let StyledWeeklyWrapper = styled.div `
  align-items: center;
  display: flex;
  flex-direction: column;
`

let StyledWeeklyPosts = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${mediumUp} {
    max-width: 900px;
  }

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
`

WeeklyPosts.propTypes = propTypes

export default WeeklyPosts
