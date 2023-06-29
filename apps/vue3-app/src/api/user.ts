import type { Request, Response, Config } from '@packages/types'
import { requests } from './base'

// 用户当前菜单列表
export const getUserMenu = (params?: Request, config?: Config): Promise<any> =>
  requests.get('/api/mock/user/menu', params, config)

// 权限列表-扁平化
export const getPermissions = (params?: Request, config?: Config): Promise<any> =>
  requests.get('/api/mock/user/permissions', params, config)

// 用户当前菜单列表
export const getUserinfo = (params?: Request, config?: Config): Promise<any> =>
  requests.get('/api/mock/user/info', params, config)

// 普通用户登录
export const login = (data?: Request) => requests.post('/api/mock/user/login', data)

// 退出登录
export const logout = () => requests.post('/api/mock/user/logout')
