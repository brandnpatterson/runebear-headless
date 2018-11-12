import React from 'react';
import { Link } from 'react-router-dom';

import StyledWeeklyPost from '../styled/StyledWeeklyPost';

const WeeklyPost = ({
  authors,
  categories,
  changePage,
  content,
  post,
  tags
}) => {
  return (
    <StyledWeeklyPost key={post.id}>
      <h2>{post.title.rendered}</h2>
      <div className="card-content">
        <p dangerouslySetInnerHTML={{ __html: content }} />
        <Link className="card-read-more" to={`/weekly/${post.slug}`}>
          ...Read more {post.title.rendered}
        </Link>
      </div>
      <div className="card-footer">
        <div className="card-tags">
          {authors.map(author => {
            return (
              <p onClick={() => changePage()} key={author.id}>
                <Link
                  to={`/weekly/authors/${author.slug}`}
                  className="card-author"
                >
                  {author.name}
                </Link>
              </p>
            );
          })}
          <div className="categories-and-tags">
            {categories.map(category => {
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
            {tags.map(tag => {
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
      </div>
    </StyledWeeklyPost>
  );
};

export default WeeklyPost;
