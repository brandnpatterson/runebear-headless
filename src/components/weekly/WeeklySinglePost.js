import React from 'react';
import { func, object } from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../Loading';
import StyledWeeklySinglePost from '../StyledWeeklySinglePost';

class WeeklySinglePost extends React.Component {
  static propTypes = {
    dispatch: func.isRequired,
    weely: object,
    weeklySinglePost: object
  };

  componentDidMount() {
    this.shiftUp();
  }

  shiftUp = () => {
    window.scrollTo(0, 0);
  };

  render() {
    const { weekly, weeklySinglePost } = this.props;

    const post = weeklySinglePost.post;
    const authors = weeklySinglePost.authors;
    const categories = weeklySinglePost.categories;
    const tags = weeklySinglePost.tags;

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
        {!post ? (
          <Loading />
        ) : (
          <StyledWeeklySinglePost>
            <div className="arrow-wrapper-top arrow-wrapper">
              <PrevArrow />
              <NextArrow />
            </div>
            <h1 className="card-title">{post.title.rendered}</h1>
            <div className="card-wrapper" key={post.id}>
              <div className="card-content">
                <p
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                />
              </div>
              <div className="card-footer">
                <div className="card-tags">
                  <div className="categories-and-tags">
                    {categories &&
                      categories.map(category => {
                        return (
                          <Link
                            key={category.slug}
                            to={`/weekly/categories/${category.slug}`}
                          >
                            <p className="card-categories">
                              #{category.name}
                              &nbsp;
                            </p>
                          </Link>
                        );
                      })}
                    {tags &&
                      tags.map(tag => {
                        return (
                          <Link key={tag.slug} to={`/weekly/tags/${tag.slug}`}>
                            <p className="card-tags">
                              #{tag.name}
                              &nbsp;
                            </p>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-authors">
              {authors.map(author => {
                return (
                  <p key={author.id}>
                    All from &nbsp;
                    <Link to={`/weekly/authors/${author.slug}`}>
                      {author.name}
                    </Link>
                  </p>
                );
              })}
            </div>
          </StyledWeeklySinglePost>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  weekly: state.weekly.all
});

export default connect(mapStateToProps)(WeeklySinglePost);
