<template>
  <t-config-provider :global-config="globalConfig">
    <router-view />
  </t-config-provider>
</template>

<script lang="ts" setup>
import type { GlobalConfigProvider } from 'tdesign-mobile-vue'
import dayjs from 'dayjs'
import zhConfig from 'tdesign-mobile-vue/es/locale/zh_CN'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getToken } from '@packages/utils'
import { checkExternalWhiteRoute } from '@/router'
import 'dayjs/locale/zh-cn'
import { useUserStore } from '@/store/user'

dayjs.locale('zh-cn')

const globalConfig: GlobalConfigProvider = zhConfig as any

const router = useRouter()
const userStore = useUserStore()

const routePath = computed(() => {
  return window.location.pathname.replace(import.meta.env.BASE_URL, '/')
})

onMounted(async () => {
  if (checkExternalWhiteRoute(routePath.value)) return
  const token = getToken()
  if (!token) return
  await userStore.setUserinfo()
  // await userStore.setPermissions()
  // if ((window as any).__POWERED_BY_WUJIE__) {
  //   // @ts-ignore
  //   window.$wujie?.bus.$on('vue3-app-router-change', (name: string, path: string) => {
  //     router.push({ path })
  //   })
  // }
})
</script>

<style lang="less" scoped></style>
