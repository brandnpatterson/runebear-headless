import styled from 'styled-components';
import { gray } from '../../util/color';
import { mediumUp, smallOnly } from '../../util/media';

const StyledWeeklyByPost = styled.div`
  align-items: left;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  max-width: 700px;
  position: relative;

  @media ${mediumUp} {
    border: 1px solid ${gray};
    font-size: 16px;
    margin: 0 auto 50px;
    max-width: 700px;
    padding: 50px;
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
    margin: 0;
    padding: 55px 20px 0;

    @media ${mediumUp} {
      padding-top: 70px;
    }
  }

  .card-authors {
    min-height: 24px;
  }

  .card-read-more {
    display: block;
    text-align: right;
  }

  .card-footer {
    border: 0;
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    margin-left: 22px;
    min-height: 48px;

    @media ${smallOnly} {
      margin-bottom: 100px;
    }
  }

  .card-tags {
    @media ${mediumUp} {
      margin-bottom: 15px;
    }
  }
`;

export default StyledWeeklyByPost;
