import axios from 'axios';
import {
  CHANGE_WEEKLY_PAGE,
  ERROR_WEEKLY,
  FETCH_ALL_AUTHORS,
  FETCH_ALL_CATEGORIES,
  FETCH_ALL_PAGES,
  FETCH_ALL_TAGS,
  FETCH_ALL_WEEKLY,
  FETCH_WEEKLY,
  LOADING_PAGES,
  LOADING_WEEKLY
} from './types';

const endpoint = req => `https://admin.runebear.com/wp-json/wp/v2/${req}`;

// Fetch Current Profile
export const fetchPages = () => dispatch => {
  dispatch(loadingPages());

  axios.get(endpoint('pages')).then(res => {
    dispatch({
      type: FETCH_ALL_PAGES,
      payload: res.data
    });
    dispatch(fetchWeeklyPage());
    dispatch(fetchAllWeeklyPages());
    dispatch(fetchAllAuthors());
    dispatch(fetchAllCategories());
    dispatch(fetchAllTags());
  });
};

// Fetch All Weekly Posts
export const fetchAllWeeklyPages = () => dispatch => {
  axios
    .get(`${endpoint('weekly_posts')}?per_page=100&_embed`)
    .then(res => {
      if (res) {
        dispatch({
          type: FETCH_ALL_WEEKLY,
          payload: res.data
        });
      }
    })
    .catch(err => {
      dispatch({
        type: ERROR_WEEKLY,
        payload: err
      });
    });
};

// Fetch Weekly Page
export const fetchWeeklyPage = (pageNumber = 1) => dispatch => {
  dispatch(loadingWeekly());

  axios
    .get(`${endpoint('weekly_posts')}?per_page=4&page=${pageNumber}&_embed`)
    .then(res => {
      if (res) {
        dispatch({
          type: FETCH_WEEKLY,
          payload: res.data,
          totalPages: Number(res.headers['x-wp-totalpages']),
          pageNumber
        });
      }
    })
    .catch(err => {
      dispatch({ type: ERROR_WEEKLY, payload: err });
    });
};

// Fetch All Authors
export const fetchAllAuthors = () => dispatch => {
  axios.get(`${endpoint('post_author')}?per_page=100`).then(res => {
    dispatch({
      type: FETCH_ALL_AUTHORS,
      payload: res.data
    });
  });
};

// Fetch All Categories
export const fetchAllCategories = () => dispatch => {
  axios.get(`${endpoint('categories')}?per_page=100`).then(res => {
    dispatch({
      type: FETCH_ALL_CATEGORIES,
      payload: res.data
    });
  });
};

// Fetch All Tags
export const fetchAllTags = () => dispatch => {
  axios.get(`${endpoint('tags')}?per_page=100`).then(res => {
    dispatch({
      type: FETCH_ALL_TAGS,
      payload: res.data
    });
  });
};

// Change Weekly Page
export const changeWeeklyPage = (newPage, pagination) => dispatch => {
  if (pagination) {
    if (pagination === 'next') {
      dispatch({ type: CHANGE_WEEKLY_PAGE, payload: 'next' });
    } else {
      dispatch({ type: CHANGE_WEEKLY_PAGE, payload: 'prev' });
    }
  } else {
    dispatch({ type: CHANGE_WEEKLY_PAGE, payload: newPage });
  }
};

// Loading Pages
export const loadingPages = () => {
  return {
    type: LOADING_PAGES
  };
};

// Loading Weekly
export const loadingWeekly = () => {
  return {
    type: LOADING_WEEKLY
  };
};
