// @flow

import { createSelector } from 'reselect'
import { endpoint, apiKey } from 'config'

const selectState = () => (state: any) => state.get('app')

const selectJsState = () => createSelector(
  selectState(),
  substate => substate.toJS(),
)

const selectEndpoint = (state: any): string => {
  const app = state.get('app').toJS()
  return endpoint || app.endpoint
}

const selectApiKey = (state: any): string => {
  const app = state.get('app').toJS()
  return apiKey || app.apiKey
}

export {
  selectEndpoint,
  selectApiKey,
  selectState,
}

export default selectJsState
