import React from 'react';
import { Link } from 'react-router-dom';

import StyledWeeklyPost from '../styled/StyledWeeklyPost';

const WeeklyPost = ({ authors, categories, content, post, tags }) => {
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
          {authors &&
            authors.map(author => {
              return (
                <p key={author.id} className="card-author">
                  <Link to={`/weekly/authors/${author.slug}`}>
                    {author.name}
                  </Link>
                </p>
              );
            })}
          <div className="categories-and-tags">
            {categories &&
              categories.map(category => {
                return (
                  <Link
                    key={category.slug}
                    to={`/weekly/categories/${category.slug}`}
                  >
                    <p className="card-categories">
                      #{category.name.replace(/\s/g, '').replace(/-/g, '')}
                      &nbsp;
                    </p>
                  </Link>
                );
              })}
            {tags &&
              tags.map(tag => {
                return (
                  <Link key={tag.slug} to={`/weekly/tags/${tag.slug}`}>
                    <p className="card-tags">
                      #{tag.name.replace(/\s/g, '').replace(/-/g, '')}
                      &nbsp;
                    </p>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </StyledWeeklyPost>
  );
};

export default WeeklyPost;
