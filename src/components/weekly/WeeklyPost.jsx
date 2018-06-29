import React from 'react';
import { array, object } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { gray } from '../../util/color';
import { mediumUp } from '../../util/media';

import LinksCategories from '../LinksCategories';
import LinksTags from '../LinksTags';
import StyledPost from '../../style-templates/StyledPost';

let propTypes = {
  match: object.isRequired,
  weeklyPost: array.isRequired,
  weeklyPosts: array.isRequired
};

let WeeklyPost = ({ weeklyPost, weeklyPosts }) => {
  window.scrollTo(0, 0);

  weeklyPost = weeklyPost.filter(post => post !== null);
  let post = weeklyPost[0];
  let nextArr = [];
  let prevArr = [];

  weeklyPosts.map((p, i, { length }) => {
    if (post.id === p.id) {
      if (i + 1 === length) {
        return nextArr.push(weeklyPosts[0].slug);
      } else {
        return nextArr.push(weeklyPosts[i + 1].slug);
      }
    }

    return false;
  });

  weeklyPosts.map((p, i, { length }) => {
    if (post.id === p.id) {
      if (i === 0) {
        return prevArr.push(weeklyPosts[length - 1].slug);
      } else {
        return prevArr.push(weeklyPosts[i - 1].slug);
      }
    }

    return false;
  });

  let next = nextArr[0];
  let prev = prevArr[0];

  let PrevArrow = () => (
    <Link to={`/weekly/${prev}`}>
      <span className="left-arrow">{'<<<'}</span>
    </Link>
  );

  let NextArrow = () => (
    <Link to={`/weekly/${next}`}>
      <span className="right-arrow">{'>>>'}</span>
    </Link>
  );

  return (
    <StyledWeeklyWrapper>
      <div className="arrow-wrapper-top arrow-wrapper">
        <PrevArrow />
        <NextArrow />
      </div>
      <h1 className="card-title">{weeklyPost[0].title.rendered}</h1>
      <StyledPost className="weekly-post-complete" key={post.id}>
        <div className="card-content">
          <p dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
        <div className="card-footer">
          <div className="card-tags">
            <LinksCategories post={post} />
            <LinksTags post={post} />
          </div>
        </div>
      </StyledPost>
      <div className="arrow-wrapper-bottom arrow-wrapper">
        <PrevArrow />
        <NextArrow />
      </div>
      {post.author ? (
        <p className="card-author">
          All from &nbsp;
          <Link to={`/authors/${post.authorSlug}`}>{post.author}</Link>
        </p>
      ) : null}
    </StyledWeeklyWrapper>
  );
};

let StyledWeeklyWrapper = styled.div`
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

WeeklyPost.propTypes = propTypes;

export default WeeklyPost;
