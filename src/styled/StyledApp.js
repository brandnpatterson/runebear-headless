import styled from 'styled-components';
import { black, blue, dark2, white } from '../util/color';
import { garamond } from '../util/font';
import { mediumUp, smallOnly } from '../util/media';

const StyledApp = styled.div`
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

  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    opacity: 0;
    transition: 1.5s;
    visibility: hidden;
  }

  .wrapper.show {
    opacity: 1;
    visibility: visible;
  }

  .btn {
    background-color: #ddd;
    border: 0;
    color: ${black};
    font-size: 1rem;
    margin: 0.25rem 0.125rem;
    padding: 1rem 2rem;
    text-align: center;
    transition: 0.3s;
  }

  .btn:hover {
    color: ${white};
  }

  .loading-screen {
    align-items: center;
    color: ${white};
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding-top: 7.5rem;
    position: relative;
    width: 100vw;
  }

  .loading-screen h2 {
    left: 0;
    position: absolute;
    text-align: center;
    top: 27rem;
    width: 100%;
  }

  .main-content {
    display: flex;
    flex: auto;
    justify-content: center;

    @media ${smallOnly} {
      margin-top: -3.125rem;
    }
  }

  /* .featured-hero is defined in the wordpress CMS on Pages */
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

  .pagination {
    display: flex;
    justify-content: center;
    margin: 3.125rem auto 6.25rem;
  }

  .pagination ul {
    display: flex;
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

  .author-links a {
    color: ${dark2};
  }

  .author-links a:hover {
    color: ${blue};
  }
`;

export default StyledApp;
