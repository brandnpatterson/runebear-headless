import React from 'react';
import { array, func, number, string } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';

import LinksCategories from '../common/LinksCategories';
import LinksTags from '../common/LinksTags';
import StyledPost from '../StyledPost';
import WeeklyPagination from './WeeklyPagination';

class WeeklyPosts extends React.Component {
  static propTypes = {
    __html: string.isRequired,
    onNextWeeklyPage: func.isRequired,
    onPreviousWeeklyPage: func.isRequired,
    onSelectWeeklyPage: func.isRequired,
    pageClass: string.isRequired,
    pageTitle: string.isRequired,
    weeklyPage: number.isRequired,
    weeklyPosts: array.isRequired,
    weeklyTotalPages: number.isRequired
  };

  render() {
    let { __html, notShowingAuthor, weeklyPosts } = this.props;

    document.title = `${this.props.pageTitle} | Rune Bear`;

    return (
      <StyledWeeklyWrapper className="flex-center">
        <StyledWeeklyPosts
          className={this.props.pageClass}
          dangerouslySetInnerHTML={{ __html }}
        />
        {weeklyPosts &&
          weeklyPosts.map(post => {
            let author = post.author;
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
                  {notShowingAuthor === true || author === false ? null : (
                    <p className="card-author">
                      {author ? 'By ' : 'Loading Author...'}
                      <Link to={`/weekly/authors/${post.authorSlug}`}>
                        {author}
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
        <WeeklyPagination
          onNextWeeklyPage={this.props.onNextWeeklyPage}
          onPreviousWeeklyPage={this.props.onPreviousWeeklyPage}
          onSelectWeeklyPage={this.props.onSelectWeeklyPage}
          weeklyPage={this.props.weeklyPage}
          weeklyTotalPages={this.props.weeklyTotalPages}
        />
      </StyledWeeklyWrapper>
    );
  }
}

let StyledWeeklyWrapper = styled.div`
  margin-bottom: 40px;

  .card-tags {
    display: flex;
  }
`;

let StyledWeeklyPosts = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  @media ${mediumUp} {
    max-width: 900px;
  }
`;

export default WeeklyPosts;
