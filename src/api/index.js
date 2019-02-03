import axios from 'axios';

const endpoint = req =>
  `http://runebear.com/wp-json/wp/v2/${req}?per_page=100&_embed`;

export const fetchAll = req => {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint(req))
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const fetchRequests = () => {
  return Promise.all([
    fetchAll('categories'),
    fetchAll('pages'),
    fetchAll('post_author'),
    fetchAll('tags'),
    fetchAll('weekly_posts')
  ]).catch(err => console.error(err));
};
