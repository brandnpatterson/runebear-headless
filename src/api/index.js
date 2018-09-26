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
      .then(values => {
        const pages = {};
        let page = 1;
        const posts = values[1];

        values[0].map(page => (pages[page.slug] = page));

        const weekly = {
          authors: values[2],
          categories: values[3],
          posts,
          totalPages: null,
          tags: values[4]
        };

        let indexOne = 0;
        let indexTwo = 4;

        while (page < 5) {
          weekly[page] = values[1].slice(indexOne, indexTwo);
          weekly.totalPages = page;

          indexOne = indexOne + 4;
          indexTwo = indexTwo + 4;
          page++;
        }

        resolve({ pages, weekly });
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
