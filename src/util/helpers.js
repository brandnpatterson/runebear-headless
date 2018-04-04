function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const lowerAndDash = e => e.toLowerCase().replace(/\s+/g, '-')

const title = 'Rune Bear'
const pages = 'http://runebear.localhost/wp-json/wp/v2/pages/'

export { capitalizeFirstLetter, lowerAndDash, pages, title }
