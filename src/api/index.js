import axios from 'axios';

const endpoint = req =>
  `https://admin.runebear.com/wp-json/wp/v2/${req}?per_page=100&_embed`;

// Fetch Requests
export const fetchRequests = () => {
  return new Promise((resolve, reject) => {
    return Promise.all([
      fetchAll('pages'),
      fetchAll('weekly_posts'),
      fetchAll('post_author'),
      fetchAll('categories'),
      fetchAll('tags')
    ])
      .then(data => {
        const routes = {};
        const weekly = {
          posts: data[1],
          authors: data[2],
          categories: data[3],
          tags: data[4]
        };

        data[0].forEach(page => {
          routes[page.slug] = page;
        });

        resolve({ routes, weekly });
      })
      .catch(err => reject(err));
  });
};

const fetchAll = req => {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint(req))
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
