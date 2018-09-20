import React from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gray } from '../../util/color';
import { mediumUp } from '../../util/media';

import Loading from '../Loading';
import StyledPost from '../StyledPost';

class WeeklyPost extends React.Component {
  static propTypes = {
    weeklyPost: array.isRequired
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { weekly } = this.props;

    const post = this.props.weeklyPost[0];

    const nextArr = [];
    const prevArr = [];

    if (post && post.id) {
      weekly.map((p, i, { length }) => {
        if (post.id === p.id) {
          if (i + 1 === length) {
            return nextArr.push(weekly[0].slug);
          } else {
            return nextArr.push(weekly[i + 1].slug);
          }
        }

        return false;
      });

      weekly.map((p, i, { length }) => {
        if (post.id === p.id) {
          if (i === 0) {
            return prevArr.push(weekly[length - 1].slug);
          } else {
            return prevArr.push(weekly[i - 1].slug);
          }
        }

        return false;
      });
    }

    const next = nextArr[0];
    const prev = prevArr[0];

    const PrevArrow = () => (
      <Link onClick={this.shiftUp} to={`/weekly/${prev}`}>
        <span className="left-arrow">{'<<<'}</span>
      </Link>
    );

    const NextArrow = () => (
      <Link onClick={this.shiftUp} to={`/weekly/${next}`}>
        <span className="right-arrow">{'>>>'}</span>
      </Link>
    );

    return (
      <div>
        {post && post.content && post.content.rendered ? (
          <StyledWeeklyWrapper>
            <div className="arrow-wrapper-top arrow-wrapper">
              <PrevArrow />
              <NextArrow />
            </div>
            <h1 className="card-title">
              {post && post.title && post.title.rendered}
            </h1>
            <StyledPost className="weekly-post-complete">
              <div className="card-content">
                <p
                  dangerouslySetInnerHTML={{
                    __html: post && post.content && post.content.rendered
                  }}
                />
              </div>
              <div className="card-footer">
                <div className="card-tags">
                  {/* <LinksCategories post={post} /> */}
                  {/* <LinksTags post={post} /> */}
                </div>
              </div>
            </StyledPost>
            <div className="arrow-wrapper-bottom arrow-wrapper">
              <PrevArrow />
              <NextArrow />
            </div>
          </StyledWeeklyWrapper>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  weekly: state.weekly.all
});

export default connect(mapStateToProps)(WeeklyPost);

const StyledWeeklyWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 100px;
  text-align: left;

  .authors-header {
    display: flex;
    justify-content: center;
  }

  .authors-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 200px;
  }

  .weekly-post-complete {
    padding-top: 25px;
  }

  .card-tags {
    display: flex;
    margin-top: 25px;
  }

  .card-title {
    font-weight: bold;
    margin-bottom: 25px;
    text-align: center;
    text-transform: uppercase;

    @media ${mediumUp} {
      margin-bottom: 0;
    }
  }

  .arrow-wrapper {
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
  }

  .arrow-wrapper-top {
    margin-bottom: 50px;

    @media ${mediumUp} {
      position: absolute;
      top: 500px;
      width: 1000px;
    }
  }

  .arrow-wrapper-bottom {
    border-top: 1px solid ${gray};
    margin-bottom: 75px;
    padding-top: 50px;

    @media ${mediumUp} {
      display: none;
    }
  }

  .left-arrow,
  .right-arrow {
    border: 1px solid ${gray};
    border-radius: 10%;
    cursor: pointer;
    padding: 10px;
  }
`;
