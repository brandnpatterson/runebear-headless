import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Loading from '../Loading';
import StyledPost from '../StyledPost';
import page from '../page';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';

class Weekly extends Component {
  componentDidMount() {
    document.title = 'Weekly | Rune Bear';
  }

  onClick = e => {
    const { weekly } = this.props;
    const targetValue = e.target.textContent;

    if (weekly[targetValue]) {
      this.props.changeWeeklyPage(Number(e.target.textContent));
    } else {
      this.props.fetchWeeklyPage(Number(e.target.textContent));
    }

    window.scrollTo(0, 0);
  };

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
                    <p>Author</p>
                    <p>#links</p>
                    <p>#tags</p>
                  </div>
                </div>
              </StyledPost>
            );
          })
        )}
        <StyledPagination>
          <nav className="pagination" aria-label="pagination">
            <ul className="pagination-list">
              <li onClick={this.onClick} className="pagination-link">
                1
              </li>
              <li onClick={this.onClick} className="pagination-link">
                2
              </li>
              <li onClick={this.onClick} className="pagination-link">
                3
              </li>
            </ul>
          </nav>
        </StyledPagination>
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

const StyledPagination = styled.div`
  .is-current {
    pointer-events: none;
  }
`;
