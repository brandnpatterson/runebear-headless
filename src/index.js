import React from 'react';
import { render } from 'react-dom';
import App from './App';
// import './util/debug-styling.js';

const renderApp = () => {
  render(<App />, document.getElementById('root'));
};

renderApp();
