import { css } from 'styled-components'
import media from '../util/media'

let home = props => props.className === 'home' && css `
    display: flex;
    flex-direction: column;
    align-items: center;

    .images-wrapper p {                    
        ${media.smallOnly} {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    .home-subtitle {
        text-align: center;
        width: 300px;

        ${media.mediumUp} {
            width: 450px;
        }
    }
`

export default home
