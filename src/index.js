import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

let rootEl = document.getElementById('root')

const rendered = Component => {
  render(
    <AppContainer>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContainer>, 
    rootEl
  )
}

rendered(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    rendered(App)
  })
}
