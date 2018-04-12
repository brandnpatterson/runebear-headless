import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

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

registerServiceWorker()

rendered(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    rendered(App)
  })
}
