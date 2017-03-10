// @flow

import axios from 'axios'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { fromJS } from 'immutable'
import fecher from 'middlewares/fetcher'

let store = null

export default function initStore(reducer: Function, initialState: any = {}, isServer: boolean) {
  const middlewares = applyMiddleware(
    thunk.withExtraArgument({ axios }),
    fecher,
  )
  // Always create server store
  if (isServer && typeof window === 'undefined') {
    return createStore(reducer, initialState, middlewares)
  }
  if (!store) {
    const enhancers = [
      middlewares,
    ]

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
    /* eslint-enable */

    store = createStore(
      reducer,
      fromJS(initialState),
      composeEnhancers(...enhancers),
    )

    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducer', () => {
        System.import('./reducer').then((reducerModule) => {
          if (store) store.replaceReducer(reducerModule())
        })
      })
    }
    return store
  }
  // console.log('Store is initiated. Return it!')
  return store
}
