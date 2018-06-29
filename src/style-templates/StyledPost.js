import styled from 'styled-components';
import { gray } from '../util/color';
import { mediumUp } from '../util/media';

let StyledPost = styled.div`
  border-top: 1px solid ${gray};
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-top: 50px;
  position: relative;
  padding: 100px 0 50px;

  @media ${mediumUp} {
    border: 1px solid ${gray};
    margin: 50px;
    padding: 100px 50px 50px;
    width: 700px;
  }

  .card-title {
    font-weight: bold;
    position: absolute;
    right: 70px;
    top: 40px;
    text-align: right;
    text-transform: uppercase;
  }

  .card-read-more {
    display: block;
    text-align: right;
  }

  .card-footer {
    border: none;
    display: flex;
    flex-direction: column;
    margin-left: 22px;
  }
`;

export default StyledPost;
