import color from '../util/color'
import media from '../util/media'

// styling for submit page
const submit = `
    .submit.inner {
        display: flex;
        flex-direction: column;
        margin: 0 auto;
        ${media.mediumUp} {
            flex-direction: row;
        }
    }

    .submit-card {
        border: 1px solid ${color.black};
        margin: 50px auto;
        padding: 0 30px 50px;
        width: 100%;

        ${media.mediumUp} {
            margin: 50px 30px;
            width: 50%;
        }

        h1 {
            font-family: Garamond, serif;
            font-size: 110px;
            font-weight: bold;
            margin-top: 30px;
            padding-top: 0;
            text-align: center;
        }

        p {
            color: ${color.gray2};
        }

        .highlight {
            color: ${color.black};
        }
    }
`

export default submit
