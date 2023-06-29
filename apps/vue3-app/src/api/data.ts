import type { Request, Response, Config } from '@packages/types'
import { requests } from './base'

export function getList(data: Request, config?: Config): Promise<Response> {
  return requests.get('/api/mock/data/list', data, config)
}
