import { FETCH_PAGES, LOADING_PAGES } from '../actions/types';

const initialState = {
  data: [],
  home: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAGES:
      return {
        ...state,
        data: action.payload,
        home: action.payload.filter(page => page.slug === 'home')[0].content
          .rendered,
        loading: false
      };
    case LOADING_PAGES:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
