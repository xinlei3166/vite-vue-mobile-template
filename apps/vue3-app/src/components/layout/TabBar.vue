<template>
  <t-tab-bar v-show="showTabBar" v-model="activeTabBar" fixed>
    <t-tab-bar-item
      v-for="item in tabBars"
      :key="item.to"
      :value="item.to"
      @click="onTabClick(item)"
    >
      <template #icon>
        <t-icon :name="item.icon" />
      </template>
      {{ item.title }}
    </t-tab-bar-item>
  </t-tab-bar>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface TabBar {
  title: string
  to: string
  icon: string
  [key: string]: any
}

const props = defineProps({
  defaultActiveTabBar: { type: [Number, String], default: '' },
  tabBars: { type: Array as PropType<TabBar[]>, default: () => [] }
})

// ====================== Hooks ======================
const router = useRouter()

// ====================== Lifecycle ======================
onMounted(() => {
  const path = router.currentRoute.value.path
  if (tabBarKeys.value.includes(path)) {
    activeTabBar.value = path
  }
})

// ====================== Components ======================
const internalTabBars = ref<TabBar[]>([
  { title: '首页', to: '/home', icon: 'home' },
  { title: '资讯', to: '/news', icon: 'tips' },
  { title: '消息', to: '/message', icon: 'chat-message' },
  { title: '我的', to: '/my', icon: 'user' }
])

const activeTabBar = ref(props.defaultActiveTabBar || internalTabBars.value[0].to)
const tabBars = computed<TabBar[]>(() => {
  return props.tabBars.length ? props.tabBars : internalTabBars.value
})
const tabBarKeys = computed<any[]>(() => {
  return tabBars.value.map(item => item.to)
})

const showTabBar = computed(() =>
  internalTabBars.value.some(item => item.to === router.currentRoute.value.path)
)

// ====================== Methods ======================
const onTabClick = (item: TabBar) => {
  router.push(item.to)
}
</script>
<style lang="less" scoped></style>
