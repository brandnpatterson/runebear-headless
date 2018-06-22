import React from 'react'
import { array, object } from 'prop-types'
import { Link } from 'react-router-dom'
import StyledPost from '../templates/StyledPost'
import styled from 'styled-components'

let propTypes = {
  match: object.isRequired,
  weeklyPosts: array.isRequired
}

let Tag = ({ match, weeklyPosts }) => {
  window.scrollTo(0, 0)

  let filtered = []
  let flatten = [].concat.apply([], weeklyPosts)
  flatten.map(post => {
    if (post) {
      return filtered.push(post)
    }
    
    return false
  })

  return (
    <StyledTag>
      <div className="tags-header">
        <h1>
          <strong>
            {match.params.tagName.toUpperCase()}
          </strong>
        </h1>
      </div>
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
            {post.authorSlug !== ''
              ? <div className="card-footer">
                  <Link to={`/authors/${post.authorSlug}`}>
                    <p className="card-author">{post.author}</p>
                  </Link>
                </div>
              : null
            }
          </StyledPost>
        )
      })}
    </StyledTag>
  )
}

let StyledTag = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 100px;
  text-align: left;

  .tags-header {
    display: flex;
    justify-content: center;
  }

  .card-title {
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
  }
`

Tag.propTypes = propTypes

export default Tag
