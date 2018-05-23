import { css } from 'styled-components'
import color from '../util/color'
import media from '../util/media'

let submit = props => props.className === 'submit' && css `
    display: flex;
    flex-direction: column;
    margin: 0 auto;

    ${media.mediumUp} {
        flex-direction: row;
    }

    .submit-card {
        border: 1px solid ${color.black};
        display: flex;
        flex-direction: column;
        align-items: left;
        margin: 50px auto;
        padding: 0 30px 50px;
        width: 100%;

        ${media.mediumUp} {
            margin: 50px 30px;
            width: 50%;
        }

        .highlight {
            color: ${color.black};
        }

        h1 {
            font-family: Garamond, serif;
            font-size: 110px;
            font-weight: bold;
            padding-top: 0;
            display: block;
            margin: 30px auto;
        }

        p {
            color: ${color.gray2};
        }
    }
`

export default submit
