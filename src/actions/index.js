import {
  CHANGE_WEEKLY_PAGE,
  ERROR_WEEKLY,
  FETCH_PAGES,
  FETCH_WEEKLY,
  LOADING_PAGES,
  LOADING_WEEKLY
} from './types';
import axios from 'axios';

const endpoint = req => `https://admin.runebear.com/wp-json/wp/v2/${req}`;

// Fetch Current Profile
export const fetchPages = () => dispatch => {
  dispatch(loadingPages());

  axios.get(endpoint('pages')).then(res => {
    dispatch({ type: FETCH_PAGES, payload: res.data });
    dispatch(fetchWeeklyPage());
  });
};

// Fetch Weekly Posts
export const fetchWeeklyPage = (pageNumber = 1) => dispatch => {
  dispatch(loadingWeekly());

  axios
    .get(`${endpoint('weekly_posts')}?per_page=4&page=${pageNumber}`)
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
      dispatch({
        type: ERROR_WEEKLY,
        payload: err
      });
    });
};

export const changeWeeklyPage = newPage => dispatch => {
  dispatch({
    type: CHANGE_WEEKLY_PAGE,
    payload: newPage
  });
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
