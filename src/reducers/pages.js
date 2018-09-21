import { FETCH_ALL_PAGES, LOADING_PAGES } from '../actions';

const initialState = {
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_PAGES:
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
