// @flow

import request from 'axios'
import qs from 'qs'
import { appCode } from 'config'

const debug = require('debug')(`${appCode}:callApi`)

export const CALL_API = 'Call API' // Symbol('Call API')

export default function callApi({ endpoint, method, params, data }: {
  endpoint: string,
  method?: string,
  params: { [key: string]: any },
  data: any,
}) {
  debug('Call api', { endpoint, method, params, data })

  return request({
    method,
    params,
    data,
    url: endpoint,
    paramsSerializer: param => qs.stringify(param),
    contentType: 'application/json; charset=utf-8',
    responseType: 'json',
  })
  .then(response => response.data)
}
