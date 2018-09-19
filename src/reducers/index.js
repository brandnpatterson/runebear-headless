import { combineReducers } from 'redux';
import pagesReducer from './pages';
import weeklyReducer from './weekly';

export default combineReducers({
  pages: pagesReducer,
  weekly: weeklyReducer
});
