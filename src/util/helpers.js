function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

let lowerAndDash = e => e.toLowerCase().replace(/\s+/g, '-')

let title = 'Rune Bear'

export { capitalizeFirstLetter, lowerAndDash, title }
