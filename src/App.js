import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" />
        </div>
      </Router>
    );
  }
}

export default App;
