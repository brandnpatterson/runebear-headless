import { FETCH_PAGES, LOADING_PAGES } from '../actions/types';

const initialState = {
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAGES:
      action.payload && action.payload.map(page => (state[page.slug] = page));

      return { ...state, loading: false };
    case LOADING_PAGES:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
