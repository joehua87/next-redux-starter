// @flow

import { createSelector } from 'reselect'

const selectState = () => (state: any) => state.get('home')

const selectJsState = () => createSelector(
  selectState(),
  substate => substate.toJS(),
)
export {
  selectState,
}

export default selectJsState
