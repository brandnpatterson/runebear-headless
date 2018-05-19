function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

let lowerAndDash = e => e.toLowerCase().replace(/\s+/g, '-')

let title = 'Rune Bear'
let pages = 'http://api.runebear.localhost/wp-json/wp/v2/pages/'
// let pages = 'https://admin.runebear.com/wp-json/wp/v2/pages/'

export { capitalizeFirstLetter, lowerAndDash, pages, title }
