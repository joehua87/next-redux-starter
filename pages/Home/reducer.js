// @flow

import { fromJS } from 'immutable'
import * as constants from './constants'

const initialState = fromJS({
  isLoading: false,
  articles: [],
})

export default function reducer(state: any = initialState, action: any = {}) {
  switch (action.type) {
    case constants.LOAD_ARTICLES_START:
      return state
        .set('isLoading', true)
    case constants.LOAD_ARTICLES_SUCCESS:
      return state
        .set('isLoading', false)
        .set('articles', action.payload.articles)
    default:
      return state
  }
}
