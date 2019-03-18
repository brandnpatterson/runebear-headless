import React, { useState, useEffect } from 'react';
import { array, bool, object } from 'prop-types';
import { Link } from 'react-router-dom';
import { decodeHtml } from '../../util';

import StyledWeeklySinglePost from '../../styled/StyledWeeklySinglePost';

const propTypes = {
  loading_secondary: bool.isRequired,
  post: object.isRequired,
  posts: array.isRequired
};

const WeeklyBySinglePost = ({ loading_secondary, post, posts }) => {
  const [scrolled, setScrolled] = useState(false);

  const decodedTitle = decodeHtml(post.title.rendered);
  document.title = `${decodedTitle} | Rune Bear`;

  useEffect(() => {
    // only scroll up on initial render
    if (!scrolled) {
      window.scrollTo(0, 0);
      setScrolled(true);
    }

    return () => {};
  });

  let next;
  let prev;

  posts.forEach((_post, index) => {
    if (_post.id === post.id) {
      if (posts[index + 1]) {
        next = posts[index + 1];
      } else {
        next = posts[0];
      }

      if (posts[index - 1]) {
        prev = posts[index - 1];
      } else {
        prev = posts[posts.length - 1];
      }
    }
  });

  const NextArrow = () => (
    <Link onClick={() => window.scrollTo(0, 0)} to={`/weekly/${next.slug}`}>
      <span className="right-arrow">{'>>>'}</span>
    </Link>
  );

  const PrevArrow = () => (
    <Link onClick={() => window.scrollTo(0, 0)} to={`/weekly/${prev.slug}`}>
      <span className="left-arrow">{'<<<'}</span>
    </Link>
  );

  const categories = post._embedded && post._embedded['wp:term'][0];
  const tags = post._embedded && post._embedded['wp:term'][1];
  const authors = post._embedded && post._embedded['wp:term'][2];

  return (
    <StyledWeeklySinglePost>
      {!loading_secondary && (
        <div className="arrow-wrapper-top arrow-wrapper">
          <PrevArrow />
          <NextArrow />
        </div>
      )}
      <header className="filter-header">
        <h1 style={{ textAlign: 'center' }}>
          <strong>{decodedTitle.toUpperCase()}</strong>
        </h1>
      </header>
      <div className="card-wrapper" key={post.id}>
        <div className="card-content">
          <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
        <div className="card-footer">
          <div className="categories-and-tags">
            {!loading_secondary
              ? categories &&
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
                })
              : '#...'}
            {!loading_secondary
              ? tags &&
                tags.map(tag => {
                  return (
                    <Link key={tag.slug} to={`/weekly/tags/${tag.slug}`}>
                      <p className="card-tags">
                        #{tag.name.replace(/\s/g, '').replace(/-/g, '')}
                        &nbsp;
                      </p>
                    </Link>
                  );
                })
              : ''}
          </div>
        </div>
      </div>
      <div className="card-authors">
        {!loading_secondary
          ? authors &&
            authors.map(author => {
              return (
                <p key={author.id}>
                  All from{' '}
                  <Link to={`/weekly/post-author/${author.slug}`}>
                    {author.name}
                  </Link>
                </p>
              );
            })
          : 'Loading authors...'}
      </div>
    </StyledWeeklySinglePost>
  );
};

WeeklyBySinglePost.propTypes = propTypes;

export default WeeklyBySinglePost;
