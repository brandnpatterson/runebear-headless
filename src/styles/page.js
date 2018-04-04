import media from '../util/media'

// boilerplate styling for all pages
const page = `
    h1, h2, h3, h4 {
        max-width: 550px;
    }

    h1 {
        font-size: 26px;

        ${media.mediumUp} {
            font-size: 30px;
        }
    }

    h2 {
        font-size: 22px;

        ${media.mediumUp} {
            font-size: 26px;
        }
    }

    h3 {
        font-size: 20px;

        ${media.mediumUp} {
            font-size: 22px;
        }
    }

    h4 {
        font-size: 18px;

        ${media.mediumUp} {
            font-size: 20px;
        }
    }
`

export default page
