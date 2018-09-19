import React from 'react';
import { render } from 'react-dom';
import Store from './Store';
import App from './App';
import { AppContainer } from 'react-hot-loader';

let renderApp = () => {
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
