import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { gray } from '../util/color'
import { garamond } from '../util/font'
import { mediumUp } from '../util/media'

let FilterByAuthor = ({ match, weekly_posts }) => {
  let filtered = []

  window.scrollTo(0, 0)

  weekly_posts.map(post => {
    if (post)
      return filtered.push(post)
    else return false
  })

  let post = filtered[0]

  return (
    <StyleFiltered>
      {post && post.author && post.author_description &&
        <div>
          <h1 className="card-title">{post.author}</h1>
        <p className="card-author-description">{post.author_description}</p>
        </div>
      }
      {filtered.map((post, postIndex) => {
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
                {post.tag_names && post.tag_names.map((tag, index, { length }) => {
                  return <Link to={`/tags/${tag}`} key={index}>{'#' + tag}&nbsp;</Link>
                })}
              </div>
            </div>
          </StyledPost>
        )
      })}
    </StyleFiltered>
  )
}


let StyleFiltered = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 100px;
  text-align: left;

  .authors-header {
    display: flex;
    justify-content: center
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

export default FilterByAuthor
