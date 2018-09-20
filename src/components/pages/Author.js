import React from 'react';
import { connect } from 'react-redux';
import { array } from 'prop-types';
import styled from 'styled-components';
import { mediumUp } from '../../util/media';
import Loading from '../Loading';
import StyledPost from '../StyledPost';

class Author extends React.Component {
  static propTypes = {
    weeklyByAuthor: array.isRequired
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { weeklyByAuthor } = this.props;

    const author = weeklyByAuthor[0];

    return author ? (
      <StyledAuthor className="flex-center">
        <div>
          <h1 className="card-title">{author.name}</h1>
          <p className="card-author-description">{author.description}</p>
        </div>
      </StyledAuthor>
    ) : (
      <Loading />
    );
  }
}

const mapStateToProps = state => ({
  weekly: state.weekly
});

export default connect(mapStateToProps)(Author);

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
    max-width: 90%;
    @media ${mediumUp} {
      width: 775px;
    }
  }
`;
// <StyledPost key={post.id}>
//   <h2 className="card-title">{post.title.rendered}</h2>
//   <div className="card-content">
//     <p dangerouslySetInnerHTML={{ __html: excerpt }} />
//     <Link className="card-read-more" to={`/weekly/${post.slug}`}>
//       ...Read more {post.title.rendered}
//     </Link>
//   </div>
//   <div className="card-footer">
//     <div className="card-tags">
//       {post.authors &&
//         post.authors.map(author => {
//           return (
//             <Link to={`/weekly/authors/${author.slug}`}>
//               <p className="card-author">{author.name}</p>
//             </Link>
//           );
//         })}
//       {post.categories_wp &&
//         post.categories_wp.map(category => {
//           return (
//             <Link to={`/weekly/categories/${category.slug}`}>
//               <p className="card-author">#{category.name}</p>
//             </Link>
//           );
//         })}
//       {post.tags &&
//         post.tags.map(tag => {
//           return (
//             <Link to={`/weekly/tags/${tag.slug}`}>
//               <p className="card-author">#{tag.name}</p>
//             </Link>
//           );
//         })}
//     </div>
//   </div>
// </StyledPost>
