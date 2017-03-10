// @flow

import React from 'react'
import { Provider } from 'react-redux'
import { fromJS } from 'immutable'
import initStore from 'store'
import createReducer from 'reducer'
import { loadConfig } from 'pages/App/actions'
import ContactPage from './Contact'

export default class Contact extends React.Component {
  store: any;

  static async getInitialProps({ req }) {
    const isServer = !!req
    const store = initStore(createReducer(), fromJS({}), isServer)
    await store.dispatch(loadConfig())
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
        <ContactPage />
      </Provider>
    )
  }
}
