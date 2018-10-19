import styled from 'styled-components';
import { gray } from '../../util/color';
import { mediumUp, smallOnly } from '../../util/media';

const StyledWeeklySinglePost = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  justify-content: space-around;
  text-align: left;
  width: 100%;

  @media ${smallOnly} {
    margin-top: 50px;
  }

  @media ${mediumUp} {
    font-size: 16px;
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
      border-width: 1px;
      padding: 50px 0;
      width: 700px;
    }
  }

  .card-content {
    padding: 0 20px;

    @media ${mediumUp} {
      padding: 30px 74px 15px;
    }
  }

  .card-footer {
    border: 0;
    margin-top: 50px;
    padding-left: 1.5rem;

    @media ${mediumUp} {
      margin-top: 100px;
      padding-bottom: 20px;
      padding-left: 74px;
    }
  }

  .card-authors {
    margin: 50px auto;
  }

  .categories-and-tags {
    display: flex;
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

  .left-arrow,
  .right-arrow {
    border: 1px solid ${gray};
    border-radius: 10%;
    cursor: pointer;
    padding: 10px;
  }
`;

export default StyledWeeklySinglePost;
