import { FETCH_PAGES } from './types';
import axios from 'axios';

export const fetchPages = () => {
  const payload = axios.get('https://admin.runebear.com/wp-json/wp/v2/pages');

  return { type: FETCH_PAGES, payload };
};
