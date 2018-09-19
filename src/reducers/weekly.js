import {
  ERROR_WEEKLY,
  FETCH_WEEKLY,
  LOADING_WEEKLY,
  CHANGE_WEEKLY_PAGE
} from '../actions/types';

const initialState = {
  all: [],
  error: false,
  loading: false,
  pageNumber: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WEEKLY:
      const allDelivered = [...state.all, action.payload];
      const flattened = [].concat.apply([], allDelivered);

      return {
        ...state,
        all: flattened,
        [`${action.pageNumber}`]: action.payload,
        loading: false,
        totalPages: action.totalPages
      };
    case CHANGE_WEEKLY_PAGE:
      return {
        ...state,
        pageNumber: action.payload
      };
    case LOADING_WEEKLY:
      return {
        ...state,
        loading: true
      };
    case ERROR_WEEKLY:
      return {
        ...state,
        error: true,
        loading: false
      };
    default:
      return state;
  }
};
