import { ref } from 'vue'
import { ContentTypeEnum } from '@packages/types/enums'
import { showToast } from '@packages/utils'

const uploadFile = async (...args: any[]) => {
  console.log('args', args)
  return { code: 0, msg: '', data: {} }
}

type UploadProps = any
type UploadFile = any
export interface UploadConfig {
  upload?: boolean
  maxCount?: number
  maxSize?: number // MB
  accept?: string // .zip,.jpg
}

export function useUpload({ maxCount, maxSize, accept, upload = true }: UploadConfig) {
  const fileList = ref<any[]>([])
  const uploading = ref<boolean>(false)

  const beforeUpload: UploadProps['beforeUpload'] = (file: any) => {
    if (maxCount && fileList.value.length === maxCount) {
      showToast(`最多只能上传${maxCount}个文件`)
      return false
    }
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      showToast(`上传文件大小不能超过${maxSize}MB`)
      fileList.value.pop()
      return false
    }
    const suffixes = accept?.split(',') || []
    const sIndex = file.name.lastIndexOf('.')
    const suffix = file.name.slice(sIndex).toLowerCase()
    if (suffixes?.length && !suffixes.includes(suffix)) {
      showToast(`文件格式错误，请上传${accept}格式的文件`)
      return false
    }
    if (upload) return true
    fileList.value = [...fileList.value, file]
    console.log('fileList', fileList.value)
    return false
  }

  const onRemove: UploadProps['onRemove'] = (context: any) => {
    const { index } = context
    const newFileList = fileList.value?.slice()
    newFileList?.splice(index, 1)
    fileList.value = newFileList
  }

  const onUpload = () => {
    const formData = new FormData()
    fileList.value?.forEach((file: UploadFile) => {
      formData.append('files[]', file as any)
    })
    uploading.value = true

    // request('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
    //   method: 'post',
    //   data: formData
    // })
    //   .then(() => {
    //     fileList.value = []
    //     uploading.value = false
    //     showToast('upload successfully.')
    //   })
    //   .catch(() => {
    //     uploading.value = false
    //     showToast('upload failed.')
    //   })
  }

  const createCustomRequest = (getParams: () => Record<string, any> = () => ({})) => {
    return async (options: Record<string, any>) => {
      const { file, onProgress, onSuccess, onError } = options

      // 1. 构造上传参数
      const formData = new FormData()
      formData.append('file', file)
      const params = getParams()
      const paramskeys = Object.keys(params)
      if (paramskeys.length) {
        paramskeys.forEach(key => {
          formData.append(key, params[key])
        })
      }

      // 2. 传入定义的缩略图配置
      const thumb_image_configs = [{ width: 600, quality: 85 }]
      if (!paramskeys.includes('thumb_image_configs')) {
        formData.append('thumb_image_configs', JSON.stringify(thumb_image_configs))
      }

      // 3. 执行请求
      try {
        const res = await uploadFile(formData, {
          headers: { 'Content-Type': ContentTypeEnum.FormData },
          // 处理进度条
          onUploadProgress: (event: any) => {
            const percent = event.total ? Math.floor((event.loaded / event.total) * 100) : 0
            onProgress({ percent })
          }
        })

        if (!res || res.code !== 0) {
          throw new Error(res.msg || '上传失败')
        }
        // showToast('上传成功')
        onSuccess(res.data, file)
      } catch (err: any) {
        showToast(`上传失败: ${err.message}`)
        onError(err)
      }
    }
  }
  const customRequest = createCustomRequest()

  const onChange = ({ fileList: newFileList }: any) => {
    const list = newFileList.map((f: any) => {
      if (f.response) {
        f.url = f.response.url
      }
      return f
    })

    fileList.value = list
    console.log('fileList', fileList.value)
  }

  return {
    fileList,
    uploading,
    onRemove,
    beforeUpload,
    onUpload,
    customRequest,
    createCustomRequest,
    onChange
  }
}
