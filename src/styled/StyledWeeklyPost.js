import styled from 'styled-components';
import { gray } from '../util/color';
import { mediumUp, smallOnly } from '../util/media';

const StyledWeeklyByPost = styled.div`
  align-items: left;
  display: flex;
  flex-direction: column;
  font-size: 0.875rem;
  max-width: 43.75rem;
  position: relative;

  @media ${mediumUp} {
    border: 0.0625rem solid ${gray};
    font-size: 1rem;
    margin: 0 auto 3.125rem;
    max-width: 43.75rem;
    padding: 3.125rem;
    width: 43.75rem;
  }

  .categories-and-tags {
    display: flex;
  }

  h2 {
    font-weight: bold;
    position: absolute;
    right: 1.25rem;
    text-align: right;
    text-transform: uppercase;

    @media ${mediumUp} {
      right: 4.375rem;
    }
  }

  .card-content {
    margin: 0;
    min-width: 100%;
    padding: 3.438rem 1.25rem 0;

    @media ${mediumUp} {
      padding-top: 4.375rem;
    }
  }

  .card-authors {
    min-height: 1.5rem;
  }

  .card-read-more {
    display: block;
    text-align: right;
  }

  .card-footer {
    border: 0;
    display: flex;
    flex-direction: column;
    margin-bottom: 0.9375rem;
    margin-left: 1.375rem;
    min-height: 3rem;

    @media ${smallOnly} {
      margin-bottom: 6.25rem;
    }
  }

  .card-tags {
    @media ${mediumUp} {
      margin-bottom: 0.9375rem;
    }
  }
`;

export default StyledWeeklyByPost;
