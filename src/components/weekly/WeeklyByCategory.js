import React from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { associateFilter } from '../../util/associateFilter';

import WeeklyPost from '../WeeklyPost';

class WeeklyByCategory extends React.Component {
  static propTypes = {
    dispatch: func.isRequired,
    match: object.isRequired,
    weekly: object,
    weeklyByCategory: object
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { match, weeklyByCategory } = this.props;
    const { allAuthors } = this.props.weekly;

    const posts = weeklyByCategory.posts;

    return (
      <div>
        <header>
          <h1 style={{ textAlign: 'center' }}>
            <strong>{match.params.category.toUpperCase()}</strong>
          </h1>
        </header>
        {posts.map(post => {
          let trimmed = post.content.rendered.substr(0, 345);
          const excerpt = trimmed.substr(
            0,
            Math.min(trimmed.length, trimmed.lastIndexOf(' '))
          );

          const authors = associateFilter({
            haystack: allAuthors,
            needle: [post],
            needleProp: 'post_author'
          });

          return (
            <WeeklyPost
              authors={authors}
              content={excerpt}
              key={post.id}
              post={post}
              readMore={true}
              title={true}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  weekly: state.weekly
});

export default connect(mapStateToProps)(WeeklyByCategory);
