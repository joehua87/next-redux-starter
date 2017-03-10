// @flow

import { CALL_API } from 'helpers/callApi'
import {
  LOAD_ARTICLES_START,
  LOAD_ARTICLES_SUCCESS,
  LOAD_ARTICLES_FAIL,
} from './constants'

export const loadArticles = (source?: string = 'techcrunch') => ({ // eslint-disable-line import/prefer-default-export
  [CALL_API]: {
    types: [LOAD_ARTICLES_START, LOAD_ARTICLES_SUCCESS, LOAD_ARTICLES_FAIL],
    endpoint: '/articles',
    params: {
      source,
    },
  },
})
