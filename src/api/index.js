import axios from 'axios'

let endpoint = endpoint => `https://admin.runebear.com/wp-json/wp/v2/${endpoint}`;

let getPages = (query = '', callback) => {
  return new Promise((resolve, reject) => {
    axios.get(`${endpoint('pages')}`)
      .then(res => {
        let pages = res.data
          .filter(d => d.title.rendered !== 'Footer')
          .map(d => d)

        let header = pages
          .sort((a, b) => a.id - b.id)
          .map(d => d.title.rendered)

        let footer = res.data
          .filter(d => d.title.rendered === 'Footer')
          .map(d => d.content.rendered)

        resolve({ pages, footer, header })
      })
      .catch(err => console.log(err))
  })
}

let getWeeklyPosts = (query = '', callback) => {
  return new Promise((resolve, reject) => {
    axios.get(`${endpoint('weekly_posts')}`)
      .then(res => {
        let posts = res.data

        resolve({ posts })
      })
      .catch(err => console.log(err))
  })
}

let getAuthor = (weekly_id = '') => {
  return new Promise((resolve, reject) => {
    axios.get(`${endpoint('post_author')}?post=${weekly_id}`)
      .then(res => {
        let author = res.data

        resolve(author)
      })
      .catch(err => console.log(err))
  })
}

// let getQuarterlyPosts = (query = '', callback) => {
//   return new Promise((resolve, reject) => {
//     axios.get(quarterly_posts)
//       .then(res => {
//         let posts = res.data

//         resolve({
//           posts
//         })
//       })
//       .catch(err => console.log(err))
//   })
// }

export { getAuthor, getPages, getWeeklyPosts }
