import { css } from 'styled-components'
import comingSoon from './coming-soon'

let weekly = props => props.className === 'weekly' && css `
    ${comingSoon}
`

export default weekly
