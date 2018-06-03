import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { gray } from '../util/color'
import { garamond } from '../util/font'
import { mediumUp } from '../util/media'

let FilterByTag = ({ tags, weekly }) => {
  let filtered = []
  let flatten = [].concat.apply([], weekly)

  flatten.map(post => {
    if (post)
      return filtered.push(post)
    else return false
  })

  return (
    <StyledFiltered>
      <div className="tags-header">
        <h2>Tags:</h2>
        <ul className="tags-list">
          {tags.map((tag, index) => {
            return <li key={index}><Link to={tag}>{tag}</Link></li>
          })}
        </ul>
      </div>
      {filtered.map((post, postIndex) => {
        return (
          <StyledPost key={post.id}>
            <h2 className="card-title">{post.title.rendered}</h2>
            <div className="card-content">
              <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </div>
            <div className="card-footer">
              <Link to={`authors/${post.author_slug}`}>
                <h2 className="card-author">{post.author}</h2>
              </Link>
            </div>
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
    justify-content: space-around;
    flex-wrap: wrap;
    width: 200px;
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

  .card-content {
    position: relative;
  }

  .card-read-more {
    position: absolute;
    right: 15%;
    top: 72%;
  }

  .card-footer {
    border: none;
    display: flex;
    flex-direction: column;
    margin-left: 22px;
  }
`

export default FilterByTag
