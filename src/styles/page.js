import media from '../util/media'

// styling for all pages
const page = `
    .image-wrapper {
        display: flex;
        flex-direction: column;

        ${media.mediumUp} {
            flex-direction: row;
        }

        img {
            margin: 20px;
        }

        img:nth-child(2) {
            margin-bottom: 50px;
        }
    }

    .subtitle {
        text-align: center;
        max-width: 700px;

        ${media.mediumUp} { 
            width: 700px;
        }
    }

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
