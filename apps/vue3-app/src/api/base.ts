import { showToast, closeToast } from 'vant'
import router from '@/router'
import { useRequests } from '@packages/lib'
import { removeToken } from '@packages/utils'
import { useUserStore } from '@/store/user'
import { useMenuStore } from '@/store/menu'

const errorHandler = (msg: string) => {
  const userStore = useUserStore()
  const menuStore = useMenuStore()
  removeToken()
  userStore.cleanup()
  menuStore.cleanup()
  closeToast()
  showToast(msg)
  setTimeout(() => {
    router.push('/login')
  }, 50)
}

const baseURL = import.meta.env.VITE_API_URL
export const requests = useRequests({ baseURL, errorHandler })
