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
          authors: data[2],
          categories: data[3],
          posts: data[1],
          totalPages: null,
          tags: data[4]
        };
        const filterPagesBy = {
          weekly: {}
        };

        data[0].forEach(page => {
          routes[page.slug] = page;
        });

        const processWeekly = () => {
          const total = Math.ceil(weekly.posts.length / 4) + 1;
          let page = 1;
          let beginSlice = 0;
          let endSlice = 4;

          while (page < total) {
            filterPagesBy.weekly[page] = data[1].slice(beginSlice, endSlice);
            filterPagesBy.weekly.totalPages = page;

            beginSlice = beginSlice + 4;
            endSlice = endSlice + 4;
            page++;
          }
        };

        processWeekly();

        resolve({ filterPagesBy, routes, weekly });
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
