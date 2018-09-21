import {
  ERROR_WEEKLY,
  FETCH_ALL_AUTHORS,
  FETCH_ALL_CATEGORIES,
  FETCH_ALL_TAGS,
  FETCH_ALL_WEEKLY,
  FETCH_WEEKLY,
  LOADING_WEEKLY,
  CHANGE_WEEKLY_PAGE
} from '../actions/types';

const initialState = {
  all: [],
  allAuthors: [],
  allCategories: [],
  allTags: [],
  error: false,
  loading: false,
  pageNumber: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_WEEKLY:
      return {
        ...state,
        all: action.payload
      };
    case FETCH_ALL_AUTHORS:
      return {
        ...state,
        allAuthors: action.payload
      };
    case FETCH_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload
      };
    case FETCH_ALL_TAGS:
      return {
        ...state,
        allTags: action.payload
      };
    case FETCH_WEEKLY:
      return {
        ...state,
        [`${action.pageNumber}`]: action.payload,
        loading: false,
        totalPages: action.totalPages
      };
    case CHANGE_WEEKLY_PAGE:
      return {
        ...state,
        pageNumber: Number(action.payload)
          ? action.payload
          : action.payload === 'next'
            ? state.pageNumber + 1
            : state.pageNumber - 1
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
