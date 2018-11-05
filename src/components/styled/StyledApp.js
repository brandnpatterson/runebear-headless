import styled from 'styled-components';
import { black, blue, dark2, white } from '../../util/color';
import { garamond } from '../../util/font';
import { mediumUp, smallOnly } from '../../util/media';

const StyledApp = styled.div`
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
    border: none;
    color: black;
    padding: 16px 32px;
    text-align: center;
    font-size: 16px;
    margin: 4px 2px;
    transition: 0.3s;
  }

  .btn:hover {
    color: white;
  }

  .loading-screen {
    align-items: center;
    color: ${white};
    display: flex;
    flex-direction: column;
    padding-top: 120px;
    position: relative;
    height: 100vh;
    width: 100vw;

    @media ${smallOnly} {
      padding-top: 70px;
    }
  }

  .loading-screen h2 {
    position: absolute;
    top: 300px;

    @media ${mediumUp} {
      top: 450px;
    }
  }

  .main-content {
    display: flex;
    flex: 1;
    justify-content: center;

    @media ${smallOnly} {
      margin-top: -50px;
    }
  }

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
    font-size: 26px;
    @media ${mediumUp} {
      font-size: 30px;
    }
  }

  h2 {
    font-size: 22px;
    @media ${mediumUp} {
      font-size: 24px;
    }
  }

  h3 {
    font-size: 20px;
    @media ${mediumUp} {
      font-size: 22px;
    }
  }

  h4 {
    font-size: 18px;
    @media ${mediumUp} {
      font-size: 20px;
    }
  }

  img {
    height: 200px;
    width: 200px;
    @media ${mediumUp} {
      height: 400px;
      width: 400px;
    }
  }

  /* .featured-hero is defined in the wordpress CMS on Pages */
  .featured-hero {
    align-items: center;
    display: flex;
    flex-direction: column-reverse;
    margin: 0 auto 100px;
    justify-content: space-between;

    @media ${mediumUp} {
      flex-direction: row;
      max-width: 630px;
    }

    h1 {
      font-size: 70px;

      @media ${mediumUp} {
        font-size: 100px;
      }
    }

    img {
      height: 150px;
      width: 150px;
    }

    strong {
      color: ${black};
    }
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin: 50px auto 100px;

    ul {
      display: flex;
    }
  }

  .filter-header {
    max-width: 700px;
    padding: 24px 24px 73px 24px;

    strong {
      color: ${dark2};
    }
  }

  .filter-page {
    @media ${mediumUp} {
      margin-bottom: 50px;
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
