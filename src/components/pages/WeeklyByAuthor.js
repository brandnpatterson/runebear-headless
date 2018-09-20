import React from 'react';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';
import Loading from '../Loading';

import WeeklyPostSingle from './WeeklyPostSingle';
import { associateFilter } from '../../util';

class WeeklyByAuthor extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { weeklyByAuthor } = this.props;

    const author = weeklyByAuthor.author[0];
    const posts = weeklyByAuthor.posts;

    return author ? (
      <StyledAuthor>
        <div>
          <h1 className="card-title">{author.name}</h1>
          <p className="card-author-description">{author.description}</p>
        </div>
        {posts &&
          posts.map(post => {
            let trimmed = post.content.rendered.substr(0, 345);
            const excerpt = trimmed.substr(
              0,
              Math.min(trimmed.length, trimmed.lastIndexOf(' '))
            );

            const categories = associateFilter({
              haystack: this.props.categories,
              needle: [post],
              needleProp: 'categories'
            });

            const tags = associateFilter({
              haystack: this.props.tags,
              needle: [post],
              needleProp: 'tags'
            });

            return (
              <WeeklyPostSingle
                categories={categories}
                content={excerpt}
                key={post.id}
                post={post}
                tags={tags}
                readMore={true}
                title={true}
              />
            );
          })}
      </StyledAuthor>
    ) : (
      <Loading />
    );
  }
}

export default WeeklyByAuthor;

const StyledAuthor = styled.div`
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
    max-width: 697.5px;

    @media ${mediumUp} {
      width: 775px;
    }
  }
`;
