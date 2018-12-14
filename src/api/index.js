import axios from 'axios';

const endpoint = req =>
  `https://admin.runebear.com/wp-json/wp/v2/${req}?per_page=100&_embed`;

export const fetchAll = req => {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint(req))
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
