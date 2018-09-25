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

        values[0].map(page => (pages[page.slug] = page));

        const weekly = {
          posts: values[1],
          authors: values[2],
          categories: values[3],
          totalPages: null,
          tags: values[4]
        };

        while (page < 5) {
          weekly[page] = weekly.posts.slice(0, 4);
          weekly.totalPages = page;

          page++;
        }

        resolve({ pages, weekly });
      })
      .catch(err => reject(err));
  });
};

// Fetch All Pages
export const fetchAllPages = () => {
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
export const fetchAllWeeklyPages = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${endpoint('weekly_posts')}?per_page=100&_embed`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
};

// Fetch Weekly Page
export const fetchWeeklyPage = (pageNumber = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${endpoint('weekly_posts')}?per_page=4&page=${pageNumber}&_embed`)
      .then(res => {
        resolve({
          payload: res.data,
          totalPages: Number(res.headers['x-wp-totalpages']),
          pageNumber
        });
      })
      .catch(err => reject(err));
  });
};

// Fetch All Authors
export const fetchAllAuthors = () => {
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
export const fetchAllCategories = () => {
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
export const fetchAllTags = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${endpoint('tags')}?per_page=100`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => reject(err));
  });
};
