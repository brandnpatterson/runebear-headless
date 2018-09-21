import React from 'react';
import { render } from 'react-dom';
import Store from './Store';
import App from './App';
import { AppContainer } from 'react-hot-loader';
import { injectGlobal } from 'styled-components';
import { black } from './util/color';
import { garamond } from './util/font';
import { mediumUp } from './util/media';

const renderApp = () => {
  render(
    <Store>
      <AppContainer>
        <App />
      </AppContainer>
    </Store>,
    document.getElementById('root')
  );
};

renderApp();

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}

injectGlobal`
  .wrapper {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .content {
    flex: 1;
  }

  h1,
  h2,
  h3,
  h4 {
    color: ${black};
    font-family: ${garamond};
  }

  strong {
    color: ${black};
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
  
  .flex-center {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  {/* .featured-hero is defined in the wordpress CMS on Pages */}
  .featured-hero {
    align-items: center;
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
  
    @media ${mediumUp} {
      flex-direction: row;
      width: 650px;
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
  }
`;
