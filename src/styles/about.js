import color from '../util/color'
import media from '../util/media'

// styling for about page
const about = `
    .featured-hero {
        align-items: center;
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-around;
        width: 700px;

        ${media.mediumUp} {
            flex-direction: row;
        }
        
        h1 {
            font-family: Garamond;
            font-size: 70px;

            ${media.smallOnly} {
                margin-top: 0;
            }

            ${media.mediumUp} {
                font-size: 100px;
            }
        }
        img {
            height: 200px;
            width: 200px;
        }
    }

    hr {
        background: ${color.black};
        height: 3px;
        margin-top: 30px;
        width: 300px;
    }

    .container {
        h1,
        h2,
        h3,
        h4 {
            font-family: Garamond;
        }
    }

    .container {
        border: 2px solid ${color.gray2};
        margin: 50px auto;
        max-width: 950px;
        padding: 30px;
        width: 100%;

        ${media.mediumUp} {
            display: flex;
            justify-content: space-around;
            width: 1100px;
        }

        p {
            font-size: 18px;

            ${media.mediumUp} {
                font-size: 20px;
                padding-left: 40px;
                padding-top: 10px;
            }
        }
    }

    .content-inner {
        h1 {
            margin-bottom: 0;
        }

        h2 {
            margin-bottom: 30px;
        }

        h1,
        h2 {
            max-width: 100%;
            text-align: right;
        }
    }
`

export default about
