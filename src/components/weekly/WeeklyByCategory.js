import React from 'react';
import { object } from 'prop-types';

import WeeklyPost from './WeeklyPost';
import Pagination from '../Pagination';
import { setPageIndexes } from '../../util';

const propTypes = {
  match: object.isRequired,
  weeklyByCategory: object.isRequired
};

class WeeklyByCategory extends React.Component {
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
    const { match, weeklyByCategory } = this.props;
    const category = match.params.category.replace(/-/g, ' ');
    setPageIndexes(weeklyByCategory);

    return (
      <div className="filter-page">
        <header className="filter-header">
          <h1 style={{ textAlign: 'center' }}>
            <strong>{category.toUpperCase()}</strong>
          </h1>
        </header>
        {weeklyByCategory[this.state.currentPage].map(post => {
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
          pages={weeklyByCategory}
        />
      </div>
    );
  }
}

WeeklyByCategory.propTypes = propTypes;

export default WeeklyByCategory;
