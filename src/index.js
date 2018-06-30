import React from 'react';
import { render } from 'react-dom';
import { injectGlobal } from 'styled-components';
import { black } from './util/color';
import { garamond } from './util/font';
import { mediumUp } from './util/media';

import App from './App';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';

const renderApp = () => {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  );
};

registerServiceWorker();

renderApp();

if (module.hot) {
  module.hot.accept('./App', () => {
    renderApp();
  });
}

injectGlobal`
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

  img {
    height: 200px;
    width: 200px;
    @media ${mediumUp} {
      height: 400px;
      width: 400px;
    }
  }
`;
