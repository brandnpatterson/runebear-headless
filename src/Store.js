import React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import reduxPromise from 'redux-promise';
import reducers from './reducers';

const Store = ({ children, initialState = {} }) => {
  const store = createStore(
    reducers,
    initialState,
    process.env.NODE_ENV === 'development'
      ? compose(
          applyMiddleware(reduxPromise),
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        )
      : compose(applyMiddleware(reduxPromise))
  );

  return <Provider store={store}>{children}</Provider>;
};

export default Store;
