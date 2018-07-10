import React from 'react';
import { array } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../util/media';

import WeeklyPosts from './weekly/WeeklyPosts';

class FilterByAuthor extends React.Component {
  static propTypes = {
    weeklyByAuthor: array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      author: props.weeklyByAuthor[0] && props.weeklyByAuthor[0].author,
      authorDesc: props.weeklyByAuthor[0] && props.weeklyByAuthor[0].authorDesc
    };
  }

  render() {
    window.scrollTo(0, 0);

    let { weeklyByAuthor } = this.props;
    let { author, authorDesc } = this.state;
    let weeklyPosts = weeklyByAuthor.filter(post => post !== null);

    return (
      <StyledAuthor className="flex-center">
        <div>
          <h1 className="card-title">{author}</h1>
          <p className="card-author-description">{authorDesc}</p>
        </div>
        <WeeklyPosts weeklyPosts={weeklyPosts} notShowingAuthor={true} />
      </StyledAuthor>
    );
  }
}

let StyledAuthor = styled.div`
  justify-content: space-around;
  margin-bottom: 100px;
  min-height: 670px;
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

  .card-tags {
    display: flex;
  }

  .card-title {
    font-weight: bold;
    margin-bottom: 50px;
    text-align: center;
    text-transform: uppercase;
  }

  .card-author-description {
    margin: 0 auto;
    max-width: 90%;

    @media ${mediumUp} {
      width: 775px;
    }
  }
`;

export default FilterByAuthor;
