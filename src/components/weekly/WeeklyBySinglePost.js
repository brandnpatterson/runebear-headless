import React from 'react';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';
import { firstLetterUpper } from '../../util';

import StyledWeeklySinglePost from '../styled/StyledWeeklySinglePost';

const propTypes = {
  weekly: object.isRequired,
  WeeklyBySinglePost: object
};

const WeeklyBySinglePost = ({ weekly, weeklyBySinglePost }) => {
  const { authors, categories, post, tags } = weeklyBySinglePost;

  document.title = `${firstLetterUpper(post.title.rendered)} | Rune Bear`;
  window.scrollTo(0, 0);

  let next;
  let prev;

  weekly.posts.forEach((_post, index) => {
    if (_post.id === post.id) {
      if (weekly.posts[index + 1]) {
        next = weekly.posts[index + 1];
      } else {
        next = weekly.posts[0];
      }

      if (weekly.posts[index - 1]) {
        prev = weekly.posts[index - 1];
      } else {
        prev = weekly.posts[weekly.posts.length - 1];
      }
    }
  });

  const NextArrow = () => (
    <Link onClick={window.scrollTo(0, 0)} to={`/weekly/${next.slug}`}>
      <span className="right-arrow">{'>>>'}</span>
    </Link>
  );

  const PrevArrow = () => (
    <Link onClick={window.scrollTo(0, 0)} to={`/weekly/${prev.slug}`}>
      <span className="left-arrow">{'<<<'}</span>
    </Link>
  );

  return (
    <StyledWeeklySinglePost>
      <div className="arrow-wrapper-top arrow-wrapper">
        <PrevArrow />
        <NextArrow />
      </div>
      <h1 className="card-title">{post.title.rendered}</h1>
      <div className="card-wrapper" key={post.id}>
        <div className="card-content">
          <p
            dangerouslySetInnerHTML={{
              __html: weeklyBySinglePost.post.content.rendered
            }}
          />
        </div>
        <div className="card-footer">
          <div className="card-tags">
            <div className="categories-and-tags">
              {categories.map(category => {
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
      </div>
      <div className="card-authors">
        {authors.map(author => {
          return (
            <p key={author.id}>
              All from &nbsp;
              <Link to={`/weekly/authors/${author.slug}`}>{author.name}</Link>
            </p>
          );
        })}
      </div>
    </StyledWeeklySinglePost>
  );
};

WeeklyBySinglePost.propTypes = propTypes;

export default WeeklyBySinglePost;
