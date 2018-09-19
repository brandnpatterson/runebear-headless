import { combineReducers } from 'redux';
import pagesReducer from './pages';

export default combineReducers({
  pages: pagesReducer
});
