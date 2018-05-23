import { css } from 'styled-components'
import comingSoon from './coming-soon'

let quarterly = props => props.className === 'quarterly' && css `
    ${comingSoon}
`

export default quarterly
