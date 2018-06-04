import React from 'react'
import { array, object } from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { gray } from '../util/color'
import { garamond } from '../util/font'
import { mediumUp } from '../util/media'

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
      {filtered.map((post, postIndex) => {
        let trimmed = post.content.rendered.substr(0, 345);
        let excerpt = trimmed.substr(0, Math.min(trimmed.length, trimmed.lastIndexOf(' ')))

        if (post.authorSlug !== '') {
          return (
            <StyledPost key={post.id}>
              <h2 className="card-title">{post.title.rendered}</h2>
              <div className="card-content">
                <p dangerouslySetInnerHTML={{ __html: excerpt }} />
                <Link className="card-read-more" to={`/weekly/${post.slug}`}>...Read more {post.title.rendered}</Link>
              </div>
              <div className="card-footer">
                <Link to={`/authors/${post.authorSlug}`}>
                  <h2 className="card-author">{post.author}</h2>
                </Link>
              </div>
            </StyledPost>
          )
        } else {
          return (
            <StyledPost key={post.id}>
              <h2 className="card-title">{post.title.rendered}</h2>
              <div className="card-content">
                <p dangerouslySetInnerHTML={{ __html: excerpt }} />
                <Link className="card-read-more" to={`/weekly/${post.slug}`}>...Read more {post.title.rendered}</Link>
              </div>
            </StyledPost>
          )
        }
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
`

let StyledPost = styled.div`
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

FilterByTag.propTypes = propTypes

export default FilterByTag
