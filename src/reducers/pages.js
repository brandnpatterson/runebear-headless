import { FETCH_PAGES } from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAGES:
      const pages = action.payload.data.map(page => page);

      return [...state, ...pages];
    default:
      return state;
  }
};
