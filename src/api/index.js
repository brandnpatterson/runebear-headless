import axios from 'axios';

let endpoint = endpoint =>
  `https://admin.runebear.com/wp-json/wp/v2/${endpoint}`;

let getPages = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${endpoint('pages')}`)
      .then(res => {
        let pages = res.data
          .filter(d => d.title.rendered !== 'Footer')
          .map(d => d);

        let header = pages
          .sort((a, b) => a.id - b.id)
          .map(d => d.title.rendered);

        let footer = res.data
          .filter(d => d.title.rendered === 'Footer')
          .map(d => d.content.rendered);

        resolve({ pages, footer, header });
      })
      .catch(err => reject(err));
  });
};

let getWeeklyPosts = (page = 1) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${endpoint('weekly_posts')}?per_page=1&page=${page}`)
      .then(res => {
        let totalPages = Number(res.headers['x-wp-totalpages']);

        resolve({
          data: res.data,
          totalPages
        });
      })
      .catch(err => reject(err));
  });
};

let getTaxonomy = (taxonomy, weeklyId = '') => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${endpoint(taxonomy)}?post=${weeklyId}`)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export { getPages, getTaxonomy, getWeeklyPosts };
