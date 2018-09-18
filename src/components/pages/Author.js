import React from 'react';
import { array } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';

import WeeklyPosts from '../weekly/WeeklyPosts';
import Loading from '../common/Loading';

class FilterByAuthor extends React.Component {
  static propTypes = {
    weeklyByAuthor: array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      authors: props.weeklyByAuthor,
      authorDesc: props.weeklyByAuthor[0] && props.weeklyByAuthor[0].authorDesc
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let { weeklyByAuthor } = this.props;
    let { authors, authorDesc } = this.state;

    let currentAuthor = authors.map(author => {
      return author.authorSlugs.map(slug => {
        let unSlug = slug.replace(/-/g, ' ');

        if (slug === this.props.match.params.author) {
          return unSlug;
        } else return null;
      });
    });

    let author = currentAuthor[0];

    return author ? (
      <StyledAuthor className="flex-center">
        <div>
          <h1 className="card-title">{author}</h1>
          <p className="card-author-description">{authorDesc}</p>
        </div>
        <WeeklyPosts weeklyPosts={weeklyByAuthor} notShowingAuthor={true} />
      </StyledAuthor>
    ) : (
      <Loading />
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
