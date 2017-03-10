// @flow

import { appCode } from 'config'

export const moduleName = 'home'

export const LOAD_ARTICLES_START = `${appCode}:${moduleName}/LOAD_ARTICLES_START`
export const LOAD_ARTICLES_SUCCESS = `${appCode}:${moduleName}/LOAD_ARTICLES_SUCCESS`
export const LOAD_ARTICLES_FAIL = `${appCode}:${moduleName}/LOAD_ARTICLES_FAIL`
