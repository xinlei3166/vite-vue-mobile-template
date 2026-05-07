import axios from 'axios'
import type { Config, InternalConfig, RequestsConfig, Method } from '@packages/types'
import { ContentTypeEnum } from '@packages/types/enums'
import { showToast, showLoadingToast, closeToast } from '@packages/utils'
import {
  getToken,
  writeFile,
  writeBase64File,
  getFileNameFromContentDisposition
} from '@packages/utils'
// import { useTokenRefresh } from './useTokenRefresh'
import { parseBlobError } from './utils'

function startLoading(showLoading = false) {
  if (!showLoading) return
  showLoadingToast({
    duration: 0,
    message: '加载中...',
    preventScrollThrough: true
  })
}
function endLoading(showLoading = false) {
  if (!showLoading) return
  closeToast()
}

const createRequests = (requestsConfig: RequestsConfig = {}) => {
  const baseURL = requestsConfig.baseURL || import.meta.env.VITE_API_URL
  const authorizationKey = requestsConfig.authorizationKey || 'Authorization'
  // 20004: 登录超时, 20010: token错误, 20012: token版本错误, 20102: 用户已禁用
  const errorCodes = requestsConfig.errorCodes || [20004, 20010, 20012, 20102]
  const codeKey = requestsConfig.codeKey || 'code'
  const messageKey = requestsConfig.messageKey || 'message'
  const successCode = requestsConfig.successCode || 0
  const errorHandler = requestsConfig.errorHandler
  // const noRefreshToken = requestsConfig.noRefreshToken
  // const refreshTokenApi = requestsConfig.refreshTokenApi

  const service = axios.create({
    baseURL,
    // timeout: 60 * 1000 * 5,
    withCredentials: true, // 允许携带cookie
    headers: {
      // 'Content-Type': ContentTypeEnum.FormURLEncoded,
      // Authorization: 'token',
      'Content-Type': ContentTypeEnum.Json
    },
    requestOptions: {
      showLoading: false,
      withRequestId: false,
      responseType: 'json', // json, blob
      fileName: undefined
    }
  } as Config)

  // const { handleRefreshed } = useTokenRefresh({
  //   authorizationKey,
  //   successCode,
  //   errorHandler,
  //   refreshTokenApi
  // })

  // request 拦截器
  service.interceptors.request.use(
    async (config: InternalConfig) => {
      // config.data = qs.stringify(config.data)
      config.headers = config.headers || {}
      const token = getToken()
      if (token) {
        config.headers[authorizationKey] = token
      }
      startLoading(config?.requestOptions?.showLoading)
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // response 拦截器
  service.interceptors.response.use(
    async (response: any) => {
      endLoading(response?.config?.requestOptions?.showLoading)
      const { responseType, useHeaderFileName } = response?.config?.requestOptions || {}
      if (responseType === 'raw') return response
      if (responseType === 'blob') {
        const contentType = response.headers?.['content-type']
        if (contentType.includes('application/json')) {
          const blobError = await parseBlobError(response.data, codeKey, messageKey)

          // token 过期，需要续期
          // if (blobError.code === 20011 && !noRefreshToken) {
          //   return handleRefreshed(service, response.config)
          // }

          showToast(blobError.message || '下载失败')
          return
        }
        if (useHeaderFileName) {
          return response
        }
        return response.data
      }
      const { [codeKey]: code, [messageKey]: msg } = response?.data || {}
      if (code && errorCodes.includes(code)) {
        // showToast(msg)
        // router.push('/login')
        errorHandler?.(msg)
        return response.data
      }
      // token过期，需要续期
      // if (code && code === 20011 && !noRefreshToken) {
      //   return handleRefreshed(service, response.config)
      // }
      if (code && code !== successCode) {
        closeToast()
        showToast(msg)
      }
      return response?.data
    },
    error => {
      // if (error && error.response) {
      //   error.message = httpMsg[error.response.status] || httpMsg.errorMsg
      // }
      if (error.message) {
        closeToast()
        showToast(error.message)
      }
      return Promise.reject(error)
    }
  )

  const request = (config: Config): Promise<any> =>
    service
      .request(config)
      .then(res => res)
      .catch(e => console.log(e))

  const get = (url: string, ...args: any): Promise<any> =>
    service
      .get(url, ...args)
      .then(res => res)
      .catch(e => console.log(e))

  const post = (url: string, ...args: any): Promise<any> =>
    service
      .post(url, ...args)
      .then(res => res)
      .catch(e => console.log(e))

  const put = (url: string, ...args: any): Promise<any> =>
    service
      .put(url, ...args)
      .then(res => res)
      .catch(e => console.log(e))

  const patch = (url: string, ...args: any): Promise<any> =>
    service
      .patch(url, ...args)
      .then(res => res)
      .catch(e => console.log(e))

  const _delete = (url: string, ...args: any): Promise<any> =>
    service
      .delete(url, ...args)
      .then(res => res)
      .catch(e => console.log(e))

  const download = (url: string, data: any, config: Config = {}): Promise<any> => {
    let api
    const method = (config.method || 'post') as Method
    if (method === 'get') {
      api = service[method](url, { ...config, params: data })
    } else {
      api = service[method](url, data, config)
    }
    const { fileName, responseType, stringify, cb, blobOptions, useHeaderFileName } =
      config.requestOptions || {}
    let headerFileName = ''
    return api
      .then(async (res: any) => {
        cb?.(res)
        let data
        if (responseType === 'blob') {
          if (!res) return false
          if (useHeaderFileName) {
            data = res.data
            // 从response的headers中获取filename, "Content-disposition", "attachment; filename=xxxx.docx"
            const contentDisposition =
              res.headers['content-disposition'] || res.headers['Content-Disposition']
            headerFileName = getFileNameFromContentDisposition(contentDisposition)
            console.log('headerFileName:', headerFileName)
          } else {
            data = res
          }
        } else {
          const { code, data: _data, message: msg } = res
          if (code && code !== successCode) {
            return
          }
          data = stringify ? JSON.stringify(_data) : _data
        }
        const write = responseType === 'base64' ? writeBase64File : writeFile
        await write(headerFileName || (fileName as string), data, blobOptions)
        return true
      })
      .catch(e => console.log(e))
  }

  return { request, get, post, put, patch, delete: _delete, download }
}

export const useRequests = createRequests
