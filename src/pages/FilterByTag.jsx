import React from 'react'
import { array, object } from 'prop-types'
import { Link } from 'react-router-dom'
import StyledPost from '../templates/StyledPost'
import styled from 'styled-components'

let propTypes = {
  match: object.isRequired,
  tags: array.isRequired,
  weeklyPosts: array.isRequired
}

let FilterByTag = ({ match, tags, weeklyPosts }) => {
  let matched = match.params.author
  let filtered = []
  let flatten = [].concat.apply([], weeklyPosts)

  window.scrollTo(0, 0)

  flatten.map(post => {
    if (post)
      return filtered.push(post)
    else return false
  })

  return (
    <StyledFiltered>
      <h1 className="card-title">Tags</h1>
      <div className="tags-header">
        <ul className="tags-list">
          {tags.map((tag, index) => {
            return <li className={matched} key={index}><Link to={tag}>{'#' + tag}</Link></li>
          })}
        </ul>
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
                  <h2 className="card-author">{post.author}</h2>
                </Link>
              </div>
              : null
            }
          </StyledPost>
        )
      })}
    </StyledFiltered>
  )
}

let StyledFiltered = styled.div`
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

  .tags-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 200px;
  }

  .card-title {
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
  }
`

FilterByTag.propTypes = propTypes

export default FilterByTag
