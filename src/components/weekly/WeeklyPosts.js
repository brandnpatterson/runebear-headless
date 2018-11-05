import React from 'react';
import { object } from 'prop-types';

import WeeklyPost from './WeeklyPost';
import Pagination from '../Pagination';
import { setPageIndexes } from '../../util';

const propTypes = {
  route: object.isRequired
};

class WeeklyPosts extends React.Component {
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
    const { route, weekly } = this.props;
    setPageIndexes(weekly);

    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: route.content.rendered }} />
        {weekly[this.state.currentPage].map(post => {
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
          pages={weekly}
        />
      </div>
    );
  }
}

WeeklyPosts.propTypes = propTypes;

export default WeeklyPosts;
