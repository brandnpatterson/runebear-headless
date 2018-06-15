import React from 'react'
import { array } from 'prop-types'
import { Link } from 'react-router-dom'
import StyledPost from '../templates/StyledPost'
import styled from 'styled-components'
import { mediumUp } from '../util/media'

let propTypes = {
  weeklyPosts: array.isRequired
}

let FilterByAuthor = ({ weeklyPosts }) => {
  let filtered = []

  window.scrollTo(0, 0)

  weeklyPosts.map(post => {
    if (post)
      return filtered.push(post)
    else return false
  })

  let post = filtered[0]

  return (
    <StyledAuthor>
      {post && post.author && post.authorDesc &&
        <div>
          <h1 className="card-title">{post.author}</h1>
        <p className="card-author-description">{post.authorDesc}</p>
        </div>
      }
      {filtered.map(post => {
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
              <div className="card-tags">
                { // list categories first
                  post.categories && post.categories.map((category, index) => {
                    return <Link to={`/categories/${category}`} key={index}>{'#' + category}&nbsp;</Link>
                })}
                  
                { // then list tags
                  post.tagNames && post.tagNames.map((tag, index) => {
                  return <Link to={`/tags/${tag}`} key={index}>{'#' + tag}&nbsp;</Link>
                })}
              </div>
            </div>
          </StyledPost>
        )
      })}
    </StyledAuthor>
  )
}

let StyledAuthor = styled.div`
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
    flex-wrap: wrap;
    justify-content: space-around;
    width: 200px;
  }

  .card-title {
    font-weight: bold;
    margin-bottom: 50px;
    text-align: center;
    text-transform: uppercase;
  }

  .card-author-description {
    margin: 0 auto;
    max-width: 90%;

    @media ${mediumUp} { 
      width: 775px;
    }
  }
`

FilterByAuthor.propTypes = propTypes

export default FilterByAuthor
