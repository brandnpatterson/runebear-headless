import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from '../Loading';
import WeeklyPagination from './WeeklyPagination';
import StyledPost from '../StyledPost';
import page from '../page';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';

class Weekly extends Component {
  componentDidMount() {
    document.title = 'Weekly | Rune Bear';
  }

  render() {
    const { __html, weekly, weeklyLoading, weeklyCurrentPage } = this.props;

    return (
      <StyledWeeklyWrapper className="flex-center">
        <StyledWeeklyPosts
          className="weekly"
          dangerouslySetInnerHTML={{ __html }}
        />
        {weeklyLoading ? (
          <Loading />
        ) : this.props.weeklyError ? (
          <div>There has been an error. Please refresh and try again.</div>
        ) : (
          weekly &&
          weekly[weeklyCurrentPage] &&
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
              <StyledPost key={post.id}>
                <h2 className="card-title">{post.title.rendered}</h2>
                <div className="card-content">
                  <p dangerouslySetInnerHTML={{ __html: excerpt }} />
                  <Link className="card-read-more" to={`/weekly/${post.slug}`}>
                    ...Read more {post.title.rendered}
                  </Link>
                </div>
                <div className="card-footer">
                  <div className="card-tags">
                    {authors &&
                      authors.map(author => {
                        return (
                          <Link
                            key={author.slug}
                            to={`/weekly/authors/${author.slug}`}
                          >
                            <p className="card-author">{author.name}</p>
                          </Link>
                        );
                      })}
                    {categories &&
                      categories.map(category => {
                        return (
                          <Link
                            key={category.slug}
                            to={`/weekly/categories/${category.slug}`}
                          >
                            <p className="card-author">#{category.name}</p>
                          </Link>
                        );
                      })}
                    {tags &&
                      tags.map(tag => {
                        return (
                          <Link key={tag.slug} to={`/weekly/tags/${tag.slug}`}>
                            <p className="card-author">#{tag.name}</p>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </StyledPost>
            );
          })
        )}
        <WeeklyPagination />
      </StyledWeeklyWrapper>
    );
  }
}

const mapStateToProps = state => ({
  weekly: state.weekly
});

export default connect(mapStateToProps)(page(Weekly));

const StyledWeeklyWrapper = styled.div`
  margin-bottom: 40px;

  .card-tags {
    display: flex;
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
