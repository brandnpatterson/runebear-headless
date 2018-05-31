import axios from 'axios'

let pages = 'https://admin.runebear.com/wp-json/wp/v2/pages/'
let weekly_posts = 'https://admin.runebear.com/wp-json/wp/v2/weekly_posts/'
// let quarterly_posts = 'https://admin.runebear.com/wp-json/wp/v2/quarterly_posts/'

let getPages = (query = '', callback) => {
  return new Promise((resolve, reject) => {
    axios.get(pages)
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
    axios.get(weekly_posts)
      .then(res => {
        let posts = res.data

        resolve({ posts })
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

export { getPages, getWeeklyPosts }
