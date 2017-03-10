// @flow

import { createAction } from 'redux-actions'
import {
  apiKey,
  endpoint,
} from 'config'
import {
  LOAD_CONFIG,
} from './contants'

/*
 * You need to pass the application config to the browser, to make request from there
 */
export const loadConfig = () => createAction(LOAD_CONFIG)({ // eslint-disable-line
  apiKey,
  endpoint,
})
