import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import WeeklyPostSingle from './WeeklyPostSingle';
import { associateFilter } from '../../util';

class WeeklyByCategory extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { match, weeklyByCategory } = this.props;
    const { allAuthors } = this.props.weekly;

    const posts = weeklyByCategory.posts;

    return (
      <StyledWeeklyCategory className="flex-center">
        <div className="categories-header">
          <h1>
            <strong>{match.params.category.toUpperCase()}</strong>
          </h1>
        </div>
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
            <WeeklyPostSingle
              authors={authors}
              content={excerpt}
              key={post.id}
              post={post}
              readMore={true}
              title={true}
            />
          );
        })}
      </StyledWeeklyCategory>
    );
  }
}

const mapStateToProps = state => ({
  weekly: state.weekly
});

export default connect(mapStateToProps)(WeeklyByCategory);

const StyledWeeklyCategory = styled.div`
  justify-content: space-around;
  margin-bottom: 100px;
  text-align: left;

  .categories-header {
    display: flex;
    justify-content: center;
  }

  .card-content {
    padding-top: 74px;
  }

  .card-title {
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
  }
`;
