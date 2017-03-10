// @flow

import { fromJS } from 'immutable'
import {
  LOAD_CONFIG,
} from './contants'

const initialState = fromJS({
  isLoading: false,
})

export default function reducer(state: any = initialState, action: any = {}) {
  switch (action.type) {
    case LOAD_CONFIG:
      // In Client Mode, values from config will be null (cannot get from process.env), so just return the state
      if (!action.payload.endpoint) return state
      return state
        .set('endpoint', action.payload.endpoint)
        .set('apiKey', action.payload.apiKey)
    default:
      return state
  }
}
