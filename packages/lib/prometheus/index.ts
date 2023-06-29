import axios from 'axios'
import { showToast } from 'vant'
import dayjs from 'dayjs'
import { deepClone } from '@packages/utils'

const config = {
  server: import.meta.env.VITE_PROMETHEUS_SERVER,
  base: '/api/v1'
}

interface PrometheusOptions {
  server?: string
  base?: string
}

interface PrometheusQueryConfig {
  method?: 'get' | 'post'
}

interface PrometheusGetMonitorConfig {
  field?: string
  format?: string
  valueFormat?: Function
  title?: string
  name?: string | Array<string>
  yAxisName?: string
}

export const chartOptionModel = {
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: []
  },
  yAxis: {
    type: 'value',
    name: ''
  },
  series: [
    // {
    //   data: [],
    //   type: 'line'
    // }
  ],
  legend: {
    data: []
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  title: {
    text: ''
  }
}

// Format
export const valueFormat = (value: number) => value.toFixed(2)
export const intValueFormat = (value: number) => value.toFixed(0)
export const percentValueFormat = (value: number) => (value * 100).toFixed(2)
export const memoryDiscount = 1000 * 1000 * 1000
export const memoryValueFormat = (value: number) => (value / memoryDiscount).toFixed(2)
export const memoryYAxisLabelFormatter = (value: any) => {
  const unit = value !== 0 ? 'G' : ''
  return value.toFixed(2) + unit
}

/**
 * prometheus 查询系统监控信息
 * @param options PrometheusOptions
 * @param options.server server
 * @param options.base base
 */
export const usePrometheus = (options?: PrometheusOptions) => {
  const server: any = options?.server || config.server
  const base: any = options?.base || config.base
  const baseurl = server + base

  /**
   * query
   * @param query 查询表达式
   * @param params 查询表达式参数
   * @param config 查询方法配置
   */
  const query = (
    query: string,
    params: Record<string, any> = {},
    config: PrometheusQueryConfig = {}
  ): Promise<any> => {
    const url = baseurl + '/query'
    const method = config.method || 'get'
    return axios[method](url, { params: { query, ...params } })
  }

  const queryRange = (
    query: string,
    params: Record<string, any>,
    config: PrometheusQueryConfig = {}
  ): Promise<any> => {
    const url = baseurl + '/query_range'
    const method = config.method || 'get'
    return axios[method](url, { params: { query, ...params } })
  }

  const getMonitor = async (
    _query: string,
    params: Record<string, any>,
    config: PrometheusGetMonitorConfig = {}
  ) => {
    let _res: Record<string, any>
    try {
      _res = await queryRange(_query, params)
      const res = _res.data
      if (res.status !== 'success') return
      if (res.data.resultType !== 'matrix') return

      const data: Record<string, any> = {
        data: res.data.result,
        option: deepClone(chartOptionModel),
        legendData: []
      }
      const names: string[] = [].concat((config.name || []) as any)
      const result = res.data.result as any
      for (const [i, r] of result.entries()) {
        const nameKey = ![null, '', undefined].includes(config.field!) ? config.field : '__name__'
        const name = names[i] || r.metric[nameKey as string]
        data.legendData.push(name)
        data.option.legend.data.push(name)
        data.option.series.push({
          smooth: true,
          name,
          data: r.values.map((v: any) =>
            config.valueFormat ? config.valueFormat(parseFloat(v[1])) : parseFloat(v[1])
          ),
          type: 'line'
        })
        const format = config.format || 'H:mm:ss'
        // 由于返回的时间到秒，需要使用unix处理
        data.option.xAxis.data = r.values.map((v: any) => dayjs.unix(v[0]).format(format))
      }
      data.option.yAxis.name = config.yAxisName
      data.option.title.text = config.title || names[0]

      return data
    } catch (e) {
      showToast('请求失败')
      return
    }
  }

  const getService = async (
    _query: string,
    params: Record<string, any> = {},
    config: PrometheusGetMonitorConfig = {}
  ) => {
    let _res: Record<string, any>
    try {
      _res = await query(_query, params)
      const res = _res.data
      if (res.status !== 'success') return
      if (res.data.resultType !== 'vector') return
      const result = res.data.result
      return {
        data: result.map((r: Record<string, any>) => ({
          name: r.metric.name,
          instance: r.metric.instance,
          status: r.value[1]
        })),
        legendData: result.map((r: Record<string, any>) => r.metric.name)
      }
    } catch (e) {
      showToast('请求失败')
      return
    }
  }

  return { query, getMonitor, getService }
}

// Usage
// const prom = usePrometheus()
// prom.query('dm_global_status_tps', { db: '192.168.200.161:5236' }).then(res => console.log(res))
