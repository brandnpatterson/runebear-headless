import React, { Component } from 'react';
import { number, object } from 'prop-types';

import WeeklyPost from '../WeeklyPost';

const propTypes = {
  page: object.isRequired,
  weekly: object.isRequired,
  weeklyPage: number.isRequired
};

class WeeklyPosts extends Component {
  componentDidUpdate() {
    console.log('update');
  }

  render() {
    const { page, weekly, weeklyPage } = this.props;

    document.title = 'Weekly | Rune Bear';

    const __html = page && page.content.rendered;

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html }} />
        {weekly[weeklyPage] &&
          weekly[weeklyPage].map(post => {
            let trimmed = post.content.rendered.substr(0, 345);
            const excerpt = trimmed.substr(
              0,
              Math.min(trimmed.length, trimmed.lastIndexOf(' '))
            );

            const categories = post._embedded['wp:term'][0];
            const tags = post._embedded['wp:term'][1];
            const authors = post._embedded['wp:term'][2];

            return (
              <WeeklyPost
                authors={authors}
                categories={categories}
                content={excerpt}
                key={post.id}
                post={post}
                readMore={true}
                tags={tags}
                title={true}
              />
            );
          })}
      </div>
    );
  }
}

WeeklyPosts.propTypes = propTypes;

export default WeeklyPosts;
