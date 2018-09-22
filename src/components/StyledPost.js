import styled from 'styled-components';
import { gray } from '../util/color';
import { mediumUp } from '../util/media';

const StyledPost = styled.div`
  align-items: left;
  border-top: 1px solid ${gray};
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  min-height: 400px;
  padding: 50px;
  position: relative;

  @media ${mediumUp} {
    border: 1px solid ${gray};
    margin: 50px auto;
    padding: 50px;
    width: 700px;
  }

  .categories-and-tags {
    display: flex;
  }

  .card-title {
    font-weight: bold;
    position: absolute;
    right: 10%;
    text-align: right;
    text-transform: uppercase;
    top: 40px;

    @media ${mediumUp} {
      right: 70px;
    }
  }

  .card-content {
    @media ${mediumUp} {
      padding-top: 74px;
    }
  }

  .card-read-more {
    display: block;
    text-align: right;
  }

  .card-footer {
    border: 0;
    display: flex;
    flex-direction: column;
    margin-left: 22px;
    min-height: 48px;
  }
`;

export default StyledPost;
