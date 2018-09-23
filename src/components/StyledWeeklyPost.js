import styled from 'styled-components';
import { gray } from '../util/color';
import { mediumUp } from '../util/media';

const StyledWeeklyByPost = styled.div`
  align-items: left;
  display: flex;
  flex-direction: column;
  min-height: 400px;
  max-width: 700px;
  position: relative;

  @media ${mediumUp} {
    border: 1px solid ${gray};
    margin: 50px auto;
    max-width: 700px;
    padding: 50px 50px 15px;
    width: 700px;
  }

  .categories-and-tags {
    display: flex;
  }

  h2 {
    font-weight: bold;
    position: absolute;
    right: 20px;
    text-align: right;
    text-transform: uppercase;

    @media ${mediumUp} {
      right: 70px;
    }
  }

  .card-content {
    min-width: 95%;
    padding-top: 80px;
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

  .card-tags {
    @media ${mediumUp} {
      margin-bottom: 15px;
    }
  }
`;

export default StyledWeeklyByPost;
