import React from 'react';
import { array } from 'prop-types';
import { Link } from 'react-router-dom';

import StyledPost from '../StyledPost';

let propTypes = {
  taxonomy: array.isRequired
};

let FilterByTaxonomy = ({ taxonomy }) => {
  return (
    <div>
      {taxonomy.map(post => {
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
            {/* {post.authorSlug !== '' ? (
              <div className="card-footer">
                {post.authorSlugs && post.authorSlugs[0] ? (
                  <Link to={`/weekly/authors/${post.authorSlugs[0]}`}>
                    <p className="card-author">{post.authors[0]} </p>
                  </Link>
                ) : null}
                {post.authorSlugs && post.authorSlugs[1] ? (
                  <Link to={`/weekly/authors/${post.authorSlugs[1]}`}>
                    <p className="card-author">{post.authors[1]}</p>
                  </Link>
                ) : null}
                {post.authorSlugs && post.authorSlugs[2] ? (
                  <Link to={`/weekly/authors/${post.authorSlugs[2]}`}>
                    <p className="card-author">{post.authors[2]}</p>
                  </Link>
                ) : null}
              </div>
            ) : null} */}
          </StyledPost>
        );
      })}
    </div>
  );
};

FilterByTaxonomy.propTypes = propTypes;

export default FilterByTaxonomy;
