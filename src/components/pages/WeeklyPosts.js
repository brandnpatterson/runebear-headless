import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';

import page from '../page';
import Loading from '../Loading';
import WeeklyPagination from './WeeklyPagination';
import WeeklyPostSingle from './WeeklyPostSingle';

class WeeklyPosts extends Component {
  componentDidMount() {
    document.title = 'Weekly | Rune Bear';
  }

  render() {
    const { __html, weekly, weeklyLoading, weeklyCurrentPage } = this.props;

    return (
      <StyledWeeklyWrapper className="flex-center">
        {weeklyLoading ? (
          <Loading />
        ) : (
          <div>
            <StyledWeeklyPosts
              className="weekly"
              dangerouslySetInnerHTML={{ __html }}
            />
            {weekly &&
              weekly[weeklyCurrentPage].map(post => {
                let trimmed = post.content.rendered.substr(0, 345);
                const excerpt = trimmed.substr(
                  0,
                  Math.min(trimmed.length, trimmed.lastIndexOf(' '))
                );

                const categories = post._embedded['wp:term'][0];
                const tags = post._embedded['wp:term'][1];
                const authors = post._embedded['wp:term'][2];

                return (
                  <WeeklyPostSingle
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
      </StyledWeeklyWrapper>
    );
  }
}

const mapStateToProps = state => ({
  weekly: state.weekly
});

export default connect(mapStateToProps)(page(WeeklyPosts));

const StyledWeeklyWrapper = styled.div`
  margin-bottom: 40px;

  .categories-and-tags {
    display: flex;
  }

  .card-content {
    padding-top: 74px;
  }
`;

const StyledWeeklyPosts = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  @media ${mediumUp} {
    max-width: 900px;
  }
`;
