import React from 'react';
import { object } from 'prop-types';

import WeeklyPost from './WeeklyPost';
import Pagination from '../Pagination';
import { setPageIndexes } from '../../util';

const propTypes = {
  match: object.isRequired,
  weeklyByTag: object.isRequired
};

class WeeklyByTag extends React.Component {
  state = {
    currentPage: 1
  };

  changePage = (newPage = 1) => {
    let { currentPage } = this.state;

    if (newPage === 'next') {
      this.setState({ currentPage: currentPage + 1 });
    } else if (newPage === 'prev') {
      this.setState({ currentPage: currentPage - 1 });
    } else {
      this.setState({ currentPage: newPage });
    }
  };

  render() {
    const { match, weeklyByTag } = this.props;
    const tag = match.params.tag.replace(/-/g, ' ');
    setPageIndexes(weeklyByTag);

    return (
      <div className="filter-page">
        <header className="filter-header">
          <h1 style={{ textAlign: 'center' }}>
            <strong>{tag.toUpperCase()}</strong>
          </h1>
        </header>
        {weeklyByTag[this.state.currentPage].map(post => {
          let trimmed = post.content.rendered.substr(0, 345);
          const excerpt = trimmed.substr(
            0,
            Math.min(trimmed.length, trimmed.lastIndexOf(' '))
          );

          return (
            <WeeklyPost
              authors={post._embedded['wp:term'][2]}
              categories={post._embedded['wp:term'][0]}
              content={excerpt}
              key={post.id}
              post={post}
              tags={post._embedded['wp:term'][1]}
            />
          );
        })}
        <Pagination
          changePage={this.changePage}
          currentPage={this.state.currentPage}
          pages={weeklyByTag}
        />
      </div>
    );
  }
}

WeeklyByTag.propTypes = propTypes;

export default WeeklyByTag;
