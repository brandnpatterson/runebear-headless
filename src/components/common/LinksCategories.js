import React from 'react';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';

let propTypes = {
  post: object
};

let LinksCategories = ({ post }) => {
  return (
    <div>
      {post.categoryType &&
        post.categoryType.map((category, index) => {
          return (
            <Link to={`/weekly/categories/${category}`} key={index}>
              {'#' + category}&nbsp;
            </Link>
          );
        })}
    </div>
  );
};

LinksCategories.propTypes = propTypes;

export default LinksCategories;
