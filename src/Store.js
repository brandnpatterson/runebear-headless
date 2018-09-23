import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const middleware = [thunk];

const Store = ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    // process.env.NODE_ENV === 'development'
    //   ? compose(
    //       applyMiddleware(...middleware),
    //       window.__REDUX_DEVTOOLS_EXTENSION__ &&
    //         window.__REDUX_DEVTOOLS_EXTENSION__()
    //     )
    //   : compose(applyMiddleware(...middleware))
    compose(applyMiddleware(...middleware))
  );

  return <Provider store={store}>{children}</Provider>;
};

export default Store;
