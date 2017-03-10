// @flow

import React from 'react'
import { Provider } from 'react-redux'
import { fromJS } from 'immutable'
import initStore from 'store'
import createReducer from 'reducer'
import { loadConfig } from 'pages/App/actions'
import HomePage from './Home'
import * as actions from './actions'

export default class Home extends React.Component {
  store: any;

  static async getInitialProps({ req, query }) {
    const isServer = !!req
    const { source } = req ? req.params : query
    const store = initStore(createReducer(), fromJS({}), isServer)
    await store.dispatch(loadConfig())
    // Utilize Promise.all to call api concurrently if you have multiple
    await Promise.all([
      store.dispatch(actions.loadArticles(source)),
    ])
    const props = {
      state: store.getState(),
      isServer,
    }
    return props
  }

  constructor(props: any) {
    super(props)
    this.store = initStore(createReducer(), props.state, props.isServer)
  }

  render() {
    return (
      <Provider store={this.store}>
        <HomePage />
      </Provider>
    )
  }
}
