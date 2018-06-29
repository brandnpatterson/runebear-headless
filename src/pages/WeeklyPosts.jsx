import React from 'react';
import { array } from 'prop-types';
import { Link } from 'react-router-dom';
import StyledPost from '../templates/StyledPost';
import styled from 'styled-components';

let propTypes = {
  weeklyPosts: array.isRequired
};

let WeeklyPosts = ({ author, weeklyPosts }) => {
  return (
    <StyledWeeklyWrapper>
      {weeklyPosts.map(post => {
        let trimmed = post.content.rendered.substr(0, 345);
        let excerpt = trimmed.substr(
          0,
          Math.min(trimmed.length, trimmed.lastIndexOf(' '))
        );

        return (
          <StyledPost key={post.id}>
            <h2 className="card-title">{post.title.rendered}</h2>
            <div className="card-content">
              <p dangerouslySetInnerHTML={{ __html: excerpt }} />
              <Link className="card-read-more" to={`/weekly/${post.slug}`}>
                ...Read more {post.title.rendered}
              </Link>
            </div>
            <div className="card-footer">
              {author === false ? null : (
                <p className="card-author">
                  By&nbsp;
                  <Link to={`authors/${post.authorSlug}`}>{post.author}</Link>
                </p>
              )}
              <div className="card-tags">
                {// list categories first
                post.categories &&
                  post.categories.map((category, index) => {
                    return (
                      <Link to={`/categories/${category}`} key={index}>
                        {'#' + category}&nbsp;
                      </Link>
                    );
                  })}
                {// then list tags
                post.tagNames &&
                  post.tagNames.map((tag, index) => {
                    return (
                      <Link to={`/tags/${tag}`} key={index}>
                        {'#' + tag}&nbsp;
                      </Link>
                    );
                  })}
              </div>
            </div>
          </StyledPost>
        );
      })}
    </StyledWeeklyWrapper>
  );
};

let StyledWeeklyWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

WeeklyPosts.propTypes = propTypes;

export default WeeklyPosts;
