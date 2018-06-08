import React from 'react'
import { array, object } from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { gray } from '../util/color'
import { garamond } from '../util/font'
import { mediumUp } from '../util/media'

let propTypes = {
  match: object.isRequired,
  weeklyPost: array.isRequired, 
  weeklyPosts: array.isRequired
}

let WeeklyPost = ({ weeklyPost, weeklyPosts }) => {
  let filtered = []
  let nextArr = []
  let prevArr = []

  window.scrollTo(0, 0)

  weeklyPost.map(post => {
    if (post)
      return filtered.push(post)
    else return false
  })

  let post = filtered[0]

  weeklyPosts.map((p, i, { length }) => {
    if (post.id === p.id) {
      if (i + 1 === length) {
        nextArr.push(weeklyPosts[0].slug)
        return true
      } else {
        nextArr.push(weeklyPosts[i + 1].slug)
        return true
      }
    } else return false
  })

  weeklyPosts.map((p, i, { length }) => {
    if (post.id === p.id) {
      if (i === 0) {
        prevArr.push(weeklyPosts[length - 1].slug)
        return true
      } else {
        prevArr.push(weeklyPosts[i - 1].slug)
        return true
      }
    } else return false
  })

  let next = nextArr[0]
  let prev = prevArr[0]

  return (
    <StyledWeeklyWrapper>
      <div className="arrow-wrapper-top arrow-wrapper">
        <Link to={`/weekly/${prev}`}>
          <span className="left-arrow">{'<<<'}</span>
        </Link>
        <Link to={`/weekly/${next}`}>
          <span className="right-arrow">{'>>>'}</span>
        </Link>
      </div>
      <h1 className="card-title">{filtered[0].title.rendered}</h1>
      {post.authorSlug !== '' 
      ?
      post.authorSlug &&
      <StyledPost key={post.id}>
        <div className="card-content">
          <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
        <div className="card-footer">
          <p className="card-author-description">{post.authorDesc}</p>
          <div className="card-tags">
            {post.tagNames && post.tagNames.map((tag, index, { length }) => {
              return <Link to={`/tags/${tag}`} key={index}>{'#' + tag}&nbsp;</Link>
            })}
          </div>
        </div>
      </StyledPost>
      :
      <StyledPost key={post.id}>
        <div className="card-content">
          <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
        <div className="card-footer">
          <div className="card-tags">
            {post.tagNames && post.tagNames.map((tag, index, { length }) => {
              return <Link to={`/tags/${tag}`} key={index}>{'#' + tag}&nbsp;</Link>
            })}
          </div>
        </div>
      </StyledPost>
      }
      <div className="arrow-wrapper-bottom arrow-wrapper">
        <Link to={`/weekly/${prev}`}>
          <span className="left-arrow">{'<<<'}</span>
        </Link>
        <Link to={`/weekly/${next}`}>
          <span className="right-arrow">{'>>>'}</span>
        </Link>
      </div>
      {post.author 
        ? 
          <p className="card-author">All from&nbsp;
          <Link to={`/authors/${post.authorSlug}`}>{post.author}</Link>
          </p>
        : null
      }
    </StyledWeeklyWrapper>
  )
}

let StyledWeeklyWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 100px;
  text-align: left;

  .authors-header {
    display: flex;
    justify-content: center;
  }

  .authors-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 200px;
  }

  .card-title {
    font-family: ${garamond};
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
  }

  .arrow-wrapper-top {
    margin-top: -30px;

    @media ${mediumUp} {
      margin-top: inherit;
      display: none;
    }
  }

  .arrow-wrapper {
      display: flex;
      justify-content: space-between;
      padding-left: 15px;
      padding-right: 15px;
      width: 100%;
  }

  .left-arrow,
  .right-arrow {
    border: 1px solid black;
    border-radius: 10%;
    cursor: pointer;
    padding: 10px;

    @media ${mediumUp} {
      position: absolute;
      top: 42%;
    }
  }

  .left-arrow {
    @media ${mediumUp} {
      bottom: inherit;
      left: 50px;
    }
  }

  .right-arrow {
    @media ${mediumUp} {
      bottom: inherit;
      right: 50px;
    }
  }
`

let StyledPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  position: relative;
  padding: 50px 0 50px;
  width: 80%;

  @media ${mediumUp} {
    border: 1px solid ${gray};
    margin: 50px;
    padding: 50px;
    width: 65%;
  }

  .card-author-description {
    margin-top: 50px;
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

WeeklyPost.propTypes = propTypes

export default WeeklyPost
