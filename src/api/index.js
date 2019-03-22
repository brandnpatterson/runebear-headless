import axios from 'axios';

let url = '';

if (process.env.NODE_ENV === 'development') {
  url = 'http://runebear.com';
}

export function endpoint(req, per_page = '100') {
  return `${url}/wp-json/wp/v2/${req}?per_page=${per_page}&_embed`;
}

export function fetchSinglePost(post_slug) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${url}/wp-json/wp/v2/weekly_posts?slug=${post_slug}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
}

export const fetchGroup = (req, per_page) => {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint(req, per_page))
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

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
