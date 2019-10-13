/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import ReduxDebug from 'redux-debug'
import Debug from 'debug'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import rootReducer from '../reducers'

export default function configureStore(history, initialState) {
  const sagaMiddleware = createSagaMiddleware()
  const reduxRouterMiddleware = routerMiddleware(history)
  const store = createStore(
    connectRouter(history)(rootReducer),
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        ReduxDebug(Debug('redux')),
        // logger,
        reduxRouterMiddleware
      ),
      typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
        ? window.__REDUX_DEVTOOLS_EXTENSION__() : callback => callback
    )
  )

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('../reducers', () => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}
