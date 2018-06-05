import {
    getPages,
    getTaxonomy,
    getWeeklyPosts,
} from '../index'

it('makes a request that returns pages', () => {
    return getPages('pages')
        .then(data => {
            console.log(data)
        })
})

it('makes a request that returns taxonomy', () => {
    return getTaxonomy(`post_author?post=${1}`)
        .then(data => {
            console.log(data)
        })
})

it('makes a request that returns weekly posts', () => {
    return getWeeklyPosts('weekly_posts')
        .then(data => {
            console.log(data)
        })
})
