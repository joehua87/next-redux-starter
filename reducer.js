// @flow

import { combineReducers } from 'redux-immutable'
import app from 'pages/App/reducer'
import home from 'pages/Home/reducer'
// Add new reducer here

export default function createReducer() {
  return combineReducers({
    app,
    home,
    // Use new reducer here
  })
}
