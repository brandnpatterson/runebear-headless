import axios from 'axios';

const endpoint = req => `https://admin.runebear.com/wp-json/wp/v2/${req}`;

// Fetch Requests
export const fetchAll = () => {
  return new Promise((resolve, reject) => {
    return Promise.all([
      fetchAllPages(),
      fetchAllWeeklyPages(),
      fetchAllAuthors(),
      fetchAllCategories(),
      fetchAllTags()
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

// Fetch All Pages
const fetchAllPages = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(endpoint('pages'))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
};

// Fetch All Weekly Posts
const fetchAllWeeklyPages = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${endpoint('weekly_posts')}?per_page=100&_embed`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
};

// Fetch All Authors
const fetchAllAuthors = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${endpoint('post_author')}?per_page=100`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
};

// Fetch All Categories
const fetchAllCategories = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${endpoint('categories')}?per_page=100`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
};

// Fetch All Tags
const fetchAllTags = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${endpoint('tags')}?per_page=100`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
};
