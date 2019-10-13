import '@babel/polyfill'
import 'raf/polyfill'
import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { hydrate } from 'react-dom'
import Loadable from 'react-loadable'
import { createBrowserHistory } from 'history'
import { AppContainer } from 'react-hot-loader'

import rootSaga from './sagas/sagaIndex'
import configureStore from './store/configureStore'
import App from './app/App'

const browserHistory = createBrowserHistory()

const dest = document.getElementById('content')

/* eslint-disable no-underscore-dangle */
const store = configureStore(browserHistory, window.__data)
if (process.env.NODE_ENV !== 'development') {
  delete window.__data
}
/* eslint-enable no-underscore-dangle */

// Scroll to top of page on route change
browserHistory.listen(() => {
  if (typeof window !== 'undefined') {
    window.scrollTo(0, 0)
  }
})

store.runSaga(rootSaga)

const renderApp = (Component) => {
  // Use Loadable to preload any modules we need for initial render
  Loadable.preloadReady().then(() => {
    const app = (
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={browserHistory}>
            <Component />
          </ConnectedRouter>
        </Provider>
      </AppContainer>
    )
    hydrate(app, dest)
  })
}

renderApp(App)

// Enable hot module reloading
if (module.hot) {
  module.hot.accept('./app/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app/App').default
    renderApp(NextApp)
  })
}
