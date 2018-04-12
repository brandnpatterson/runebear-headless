import { css } from 'styled-components'
import media from '../util/media'

// styling for quarterly and weekly pages
let comingSoon = props => props.className = comingSoon && css`
    .coming-soon-inner {
        position: relative;
        display: flex;
        flex-direction: column;

        ${media.mediumUp} {
            flex-direction: row;
            margin-top: 120px;
        }
    }

    .wp-image-15 {
        ${media.mediumUp} {
            margin-top: -120px;
            margin-right: 50px;
        }
    }

    .coming-soon {
        left: 30px;
        position: absolute;
        top: 60px;

        ${media.mediumUp} {
            font-size: 30px;
            left: 70px;
            top: 20px;
        }
    }
`

export default comingSoon
