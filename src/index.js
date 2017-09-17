import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { HashRouter } from 'react-router-dom'

import App from './app'

const render = App => {
  ReactDOM.render(
    <AppContainer>
      <HashRouter>
        <App />
      </HashRouter>
    </AppContainer>,
    document.querySelector('#root')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./app', () => render(App))
}
