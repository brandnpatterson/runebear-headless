import React from 'react';
import { object } from 'prop-types';
import { Link } from 'react-router-dom';

const propTypes = {
  post: object
};

const LinksTag = ({ post }) => {
  return (
    <div>
      {post.tagNames &&
        post.tagNames.map((tag, index) => {
          return (
            <Link to={`/weekly/tags/${tag}`} key={index}>
              {'#' + tag}
              &nbsp;
            </Link>
          );
        })}
    </div>
  );
};

LinksTag.propTypes = propTypes;

export default LinksTag;
