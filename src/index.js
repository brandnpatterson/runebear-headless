import React from 'react';
import { render } from 'react-dom';
import Store from './Store';
import App from './App';
// import './util/debug-styling.js';

const renderApp = () => {
  render(
    <Store>
      <App />
    </Store>,
    document.getElementById('root')
  );
};

renderApp();
