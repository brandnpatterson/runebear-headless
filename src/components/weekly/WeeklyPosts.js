import React, { Component } from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';

import Loading from '../Loading';
import WeeklyPagination from './WeeklyPagination';
import WeeklyPost from '../WeeklyPost';

class WeeklyPosts extends Component {
  static propTypes = {
    __html: string
  };

  componentDidMount() {
    document.title = 'Weekly | Rune Bear';
  }

  render() {
    const { weekly } = this.props;
    const { pageNumber } = this.props.weekly;

    const __html =
      this.props.pages.weekly && this.props.pages.weekly.content.rendered;

    return (
      <div>
        {false ? (
          <Loading />
        ) : (
          <div>
            <div dangerouslySetInnerHTML={{ __html }} />
            {weekly[pageNumber] &&
              weekly[pageNumber].map(post => {
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
        )}
        <WeeklyPagination />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pages: state.pages,
  weekly: state.weekly
});

export default connect(mapStateToProps)(WeeklyPosts);
