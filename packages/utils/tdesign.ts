import { Toast } from 'tdesign-mobile-vue'

export const parseOptions = (options: string | Record<string, any>) => {
  if (typeof options === 'string') {
    return { message: options }
  }
  return options
}

// 轻提示
export const showToast = (options: string | Record<string, any>) => {
  Toast({ ...parseOptions(options) })
}

// 加载提示
export const showLoadingToast = (options: string | Record<string, any>) => {
  Toast({ theme: 'loading', direction: 'column', ...parseOptions(options) })
}

// 成功提示
export const showSuccessToast = (options: string | Record<string, any>) => {
  Toast({ theme: 'success', direction: 'column', ...parseOptions(options) })
}

// 警告提示
export const showWarningToast = (options: string | Record<string, any>) => {
  Toast({ theme: 'warning', direction: 'column', ...parseOptions(options) })
}

// 错误提示
export const showErrorToast = (options: string | Record<string, any>) => {
  Toast({ theme: 'error', direction: 'column', ...parseOptions(options) })
}

// 关闭提示
export const closeToast = () => {
  Toast.clear()
}
