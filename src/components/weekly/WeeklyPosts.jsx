import React from 'react';
import { array } from 'prop-types';
import { Link } from 'react-router-dom';

import LinksCategories from '../LinksCategories';
import StyledPost from '../../style-templates/StyledPost';
import LinksTags from '../LinksTags';

let propTypes = {
  weeklyPosts: array.isRequired
};

class WeeklyPosts extends React.Component {
  render() {
    let { author, weeklyPosts } = this.props;

    return (
      <div>
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
                    {post.author ? 'By ' : null}
                    <Link to={`/weekly/authors/${post.authorSlug}`}>
                      {post.author}
                    </Link>
                  </p>
                )}
                <div className="card-tags">
                  <LinksCategories post={post} />
                  <LinksTags post={post} />
                </div>
              </div>
            </StyledPost>
          );
        })}
      </div>
    );
  }
}

WeeklyPosts.propTypes = propTypes;

export default WeeklyPosts;
