function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

let lowerAndDash = e => e.toLowerCase().replace(/\s+/g, '-')

let title = 'Rune Bear'
let pages = 'http://runebear.localhost/wp-json/wp/v2/pages/'

export { capitalizeFirstLetter, lowerAndDash, pages, title }
