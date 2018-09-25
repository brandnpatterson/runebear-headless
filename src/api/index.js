import axios from 'axios';

const endpoint = req => `https://admin.runebear.com/wp-json/wp/v2/${req}`;

// Fetch Current Profile

export const fetchAll = () => {
  return Promise.all([
    fetchAllPages(),
    fetchWeeklyPage(),
    fetchAllWeeklyPages(),
    fetchAllAuthors(),
    fetchAllCategories(),
    fetchAllTags()
  ]).then(values => {
    values.forEach(item => {
      console.log(item);
    });
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
