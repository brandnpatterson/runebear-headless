import { FETCH_PAGES, FETCH_WEEKLY, LOADING_PAGES } from './types';
import axios from 'axios';

const endpoint = req => `https://admin.runebear.com/wp-json/wp/v2/${req}`;

// Fetch Current Profile
export const fetchPages = () => dispatch => {
  dispatch(pagesLoading());

  axios.get(`${endpoint('pages')}`).then(res => {
    dispatch({ type: FETCH_PAGES, payload: res.data });
    dispatch(fetchWeeklyPage());
  });
};

// Fetch Weekly Posts
export const fetchWeeklyPage = (weekly_page = 1) => dispatch => {
  axios
    .get(`${endpoint('weekly_posts')}?per_page=4&page=${weekly_page}`)
    .then(res => {
      dispatch({
        type: FETCH_WEEKLY,
        payload: res.data,
        weekly_page
      });
    });
};

// Pages Loading
export const pagesLoading = () => {
  return {
    type: LOADING_PAGES
  };
};
