import React from 'react'
import { render } from 'react-dom'
import { injectGlobal } from 'styled-components'
import { garamond } from './util/font'
import { mediumUp } from './util/media'
import App from './App'

injectGlobal `
  h1,
  h2,
  h3,
  h4 {
    font-family: ${garamond};
  }

  h1 {
    font-size: 26px;
    @media ${mediumUp} {
      font-size: 30px;
    }
  }

  h2 {
    font-size: 22px;
    @media ${mediumUp} {
      font-size: 24px;
    }
  }

  h3 {
    font-size: 20px;
    @media ${mediumUp} {
      font-size: 22px;
    }
  }

  h4 {
    font-size: 18px;
    @media ${mediumUp} {
      font-size: 20px;
    }
  }
  
  img {
    height: 200px;
    width: 200px;
    @media ${mediumUp} {
      height: 400px;
      width: 400px;
    }
  }
`

render(
  <App />,
  document.getElementById('root')
)
