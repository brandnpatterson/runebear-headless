import React from 'react';
import { func, object } from 'prop-types';
import { connect } from 'react-redux';
import { associateFilter } from '../../util/associateFilter';

import Loading from '../Loading';
import WeeklyPost from '../WeeklyPost';

class WeeklyByAuthor extends React.Component {
  static propTypes = {
    dispatch: func.isRequired,
    weekly: object,
    weeklyByAuthor: object
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { weeklyByAuthor } = this.props;

    const author = weeklyByAuthor.author[0];
    const posts = weeklyByAuthor.posts;

    const authorLinkList = {
      66: 'http://www.andreablythe.com',
      67: 'http://www.lauramadelinewiseman.com'
    };

    const authorLinks = (author, secondAuthor) => {
      return (
        <p className="author-links">
          Learn more at{' '}
          <a href={author} target="_blank" rel="noopener noreferrer">
            {author}{' '}
          </a>
          {secondAuthor && (
            <span>
              and{' '}
              <a href={secondAuthor} target="_blank" rel="noopener noreferrer">
                {secondAuthor}{' '}
              </a>
            </span>
          )}
        </p>
      );
    };

    return author ? (
      <div>
        <header style={{ maxWidth: '700px', padding: '1.5rem' }}>
          <h1 style={{ textAlign: 'center' }}>
            <strong>{author.name.toUpperCase()}</strong>
          </h1>
          <div>
            <p>{author.description}</p>
            {author.id === 66 &&
              authorLinks(authorLinkList[66], authorLinkList[67])}
            {author.id === 67 &&
              authorLinks(authorLinkList[66], authorLinkList[67])}
          </div>
        </header>
        {posts &&
          posts.map(post => {
            let trimmed = post.content.rendered.substr(0, 345);
            const excerpt = trimmed.substr(
              0,
              Math.min(trimmed.length, trimmed.lastIndexOf(' '))
            );

            const categories = associateFilter({
              haystack: this.props.weekly.allCategories,
              needle: [post],
              needleProp: 'categories'
            });

            const tags = associateFilter({
              haystack: this.props.weekly.allTags,
              needle: [post],
              needleProp: 'tags'
            });

            return (
              <WeeklyPost
                categories={categories}
                content={excerpt}
                key={post.id}
                post={post}
                tags={tags}
                readMore={true}
                title={true}
              />
            );
          })}
      </div>
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({
  weekly: state.weekly
});

export default connect(mapStateToProps)(WeeklyByAuthor);
