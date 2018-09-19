import { FETCH_WEEKLY } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEEKLY:
      return { ...state, [action.weekly_page]: action.payload };
    default:
      return state;
  }
};
