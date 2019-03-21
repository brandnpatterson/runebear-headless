import styled from 'styled-components';
import { gray } from '../util/color';
import { mediumUp, smallOnly } from '../util/media';

const StyledWeeklySinglePost = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  justify-content: space-around;
  text-align: left;
  width: 100%;

  @media ${smallOnly} {
    margin-top: 3.125rem;
  }

  @media ${mediumUp} {
    font-size: 1rem;
  }

  .card-title {
    font-weight: bold;
    text-align: center;
    text-transform: uppercase;
  }

  .card-wrapper {
    @media ${mediumUp} {
      border-color: ${gray};
      border-image: initial;
      border-style: solid;
      border-width: 0.0625rem;
      padding: 3.125rem 0;
      width: 43.75rem;
    }
  }

  .card-content {
    padding: 0 1.25rem;

    @media ${mediumUp} {
      padding: 1.875rem 4.625rem 0.9375rem;
    }
  }

  .card-footer {
    border: 0;
    margin-top: 3.125rem;
    padding-left: 1.5rem;

    @media ${mediumUp} {
      margin-top: 6.25rem;
      padding-bottom: 1.25rem;
      padding-left: 4.625rem;
    }
  }

  .card-authors {
    margin: 3.125rem auto;
  }

  .categories-and-tags {
    display: flex;
    flex-direction: column;
  }

  .categories-and-tags-container {
    display: flex;
  }

  .arrow-wrapper {
    display: flex;
    justify-content: space-between;
    padding-left: 0.9375rem;
    padding-right: 0.9375rem;
    width: 100%;
  }

  .arrow-wrapper-top {
    margin-bottom: 3.125rem;

    @media ${mediumUp} {
      margin-top: -5rem;
      position: relative;
      top: 31.25rem;
      width: 62.5rem;
    }
  }

  .left-arrow,
  .right-arrow {
    border: 0.0625rem solid ${gray};
    border-radius: 10%;
    cursor: pointer;
    padding: 0.625rem;
  }
`;

export default StyledWeeklySinglePost;
