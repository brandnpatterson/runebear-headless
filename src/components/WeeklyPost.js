import React from 'react';
import { array, func, object, string } from 'prop-types';
import { Link } from 'react-router-dom';
import { decodeHtml } from '../util';

import StyledWeeklyPost from '../styled/StyledWeeklyPost';

const propTypes = {
  authors: array,
  categories: array,
  changePage: func,
  content: string.isRequired,
  post: object.isRequired,
  tags: array
};

const WeeklyPost = ({
  authors,
  categories,
  changePage,
  content,
  post,
  tags
}) => {
  const decodedTitle = decodeHtml(post.title.rendered);

  return (
    <StyledWeeklyPost key={post.id}>
      <h2>{decodedTitle}</h2>
      <div className="card-content">
        <p dangerouslySetInnerHTML={{ __html: content }} />
        <Link
          onClick={() => changePage()}
          className="card-read-more"
          to={`/weekly/${post.slug}`}
        >
          ...Read more {decodedTitle}
        </Link>
      </div>
      <div className="card-footer">
        <div className="card-authors">
          {authors &&
            authors.map(author => {
              return (
                <p onClick={() => changePage()} key={author.id}>
                  <Link
                    to={`/weekly/post-author/${author.slug}`}
                    className="card-author"
                  >
                    {decodeHtml(author.name)}
                  </Link>
                </p>
              );
            })}
        </div>
        <div className="categories-and-tags">
          {categories &&
            categories.map(category => {
              return (
                <p onClick={() => changePage()} key={category.slug}>
                  <Link
                    to={`/weekly/categories/${category.slug}`}
                    className="card-categories"
                  >
                    #{category.name.replace(/\s/g, '').replace(/-/g, '')}
                    &nbsp;
                  </Link>
                </p>
              );
            })}
          {tags &&
            tags.map(tag => {
              return (
                <p onClick={() => changePage()} key={tag.slug}>
                  <Link to={`/weekly/tags/${tag.slug}`} className="card-tags">
                    #{tag.name.replace(/\s/g, '').replace(/-/g, '')}
                    &nbsp;
                  </Link>
                </p>
              );
            })}
        </div>
      </div>
    </StyledWeeklyPost>
  );
};

WeeklyPost.propTypes = propTypes;

export default WeeklyPost;
