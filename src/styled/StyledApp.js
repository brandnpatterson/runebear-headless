import styled from 'styled-components';
import { black, dark2 } from '../util/color';
import { garamond } from '../util/font';
import { mediumUp, smallOnly } from '../util/media';

const StyledApp = styled.div`
  /* typography */
  li {
    list-style-type: none;
  }

  h1,
  h2,
  h3,
  h4 {
    font-family: ${garamond};
  }

  h1 {
    font-size: 1.625rem;
    @media ${mediumUp} {
      font-size: 1.875rem;
    }
  }

  h2 {
    font-size: 1.375rem;
    @media ${mediumUp} {
      font-size: 1.5rem;
    }
  }

  h3 {
    font-size: 1.25rem;
    @media ${mediumUp} {
      font-size: 1.375rem;
    }
  }

  h4 {
    font-size: 1.125rem;
    @media ${mediumUp} {
      font-size: 1.25rem;
    }
  }

  img {
    height: 12.5rem;
    width: 12.5rem;
    @media ${mediumUp} {
      height: 25rem;
      width: 25rem;
    }
  }
  /* ./typography */

  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    visibility: visible;
  }

  .main-content {
    display: flex;
    flex: auto;
    justify-content: center;

    @media ${smallOnly} {
      margin-top: -3.125rem;
    }
  }

  .featured-hero {
    align-items: center;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-between;
    margin: 0 auto 6.25rem;

    @media ${mediumUp} {
      flex-direction: row;
      max-width: 39.38rem;
    }
  }

  .featured-hero h1 {
    font-size: 4.375rem;

    @media ${mediumUp} {
      font-size: 6.25rem;
    }
  }

  .featured-hero img {
    height: 9.375rem;
    width: 9.375rem;
  }

  .featured-hero strong {
    color: ${black};
  }

  .filter-header {
    max-width: 43.75rem;
    padding: 1.5rem 1.5rem 4.563rem;
  }

  .filter-header p {
    font-size: 0.875rem;

    @media ${mediumUp} {
      font-size: 1rem;
    }
  }

  .filter-header strong {
    color: ${dark2};
  }

  .filter-page {
    @media ${mediumUp} {
      margin-bottom: 3.125rem;
    }
  }
`;

export default StyledApp;
