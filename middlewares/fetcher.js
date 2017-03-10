// @flow

import callApi, {
  CALL_API,
} from 'helpers/callApi'
import { appCode } from 'config'
import { selectEndpoint, selectApiKey } from 'pages/App/selectors'

const debug = require('debug')(`${appCode}:middleware:fetcher`)

// TODO Refactor this
export default (store: any) => (next: Function) => (action: any) => {
  if (!action) return null

  const callAPI = action[CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  debug('Trigger middleware with', callAPI)
  const apiHost = selectEndpoint(store.getState())
  const apiKey = selectApiKey(store.getState())

  let { endpoint } = callAPI
  const { types, method = 'get', params, data } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState)
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!['get', 'post', 'put', 'patch', 'del'].includes(method.toLowerCase())) {
    throw new Error('Expected method should be get, post, put, patch, del')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  endpoint = `${apiHost}/${endpoint}`

  function actionWith(actionData) {
    const finalAction = Object.assign({}, action, actionData)
    delete finalAction[CALL_API]
    return finalAction
  }

  debug('Request payload', callAPI.startPayload)
  const [requestType, successType, failureType] = types
  next(actionWith({ type: requestType, payload: callAPI.startPayload }))

  // Inject apiKey in middleware
  return callApi({ endpoint, method, params: { ...params, apiKey }, data })
    .then((response) => {
      if (response instanceof Error) {
        // Something happened in setting up the request that triggered an Error
        debug('Error', response.message)
      }
      // debug('Call api successfully', response);

      // TODO Refactor me - This is suck - but need to make it done - saga can solve this properly
      if (callAPI.successPayload) {
        return next(actionWith({
          payload: { override: callAPI.successPayload, payload: response },
          type: successType,
        }))
      }

      return next(actionWith({
        payload: response,
        type: successType,
      }))
    })
    .catch((response) => {
      // debug('Call api fail', response);

      // TODO Refactor me - This is suck - but need to make it done - saga can solve this properly
      if (callAPI.failPayload) {
        return next(actionWith({
          payload: { override: callAPI.failPayload, payload: response || { message: 'Something bad happened' } },
          type: failureType,
        }))
      }

      return next(actionWith({
        type: failureType,
        payload: response || { message: 'Something bad happened' },
      }))
    })
}
