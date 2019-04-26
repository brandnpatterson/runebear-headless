import axios from 'axios';

let url = '';

if (process.env.NODE_ENV === 'development') {
  url = 'http://runebear.com';
}

export function endpoint(req, per_page = '100') {
  return `${url}/wp-json/wp/v2/${req}?per_page=${per_page}&_embed`;
}

export function fetchSinglePost(post_slug) {
  return axios
    .get(`${url}/wp-json/wp/v2/weekly_posts?slug=${post_slug}`)
    .then(res => res.data)
    .catch(err => err);
}

export function fetchGroup(req, per_page) {
  return axios
    .get(endpoint(req, per_page))
    .then(res => res.data)
    .catch(err => err);
}

export function fetchFirstPage() {
  return Promise.all([
    fetchGroup('pages'),
    fetchGroup('weekly_posts', '4')
  ]).catch(err => console.error(err));
}

export function fetchAllRequests() {
  return Promise.all([
    fetchGroup('categories'),
    fetchGroup('pages'),
    fetchGroup('post_author'),
    fetchGroup('tags'),
    fetchGroup('weekly_posts')
  ]).catch(err => console.error(err));
}

export function fetchPostAndPages(post_slug) {
  return Promise.all([fetchGroup('pages'), fetchSinglePost(post_slug)]).catch(
    err => console.error(err)
  );
}
