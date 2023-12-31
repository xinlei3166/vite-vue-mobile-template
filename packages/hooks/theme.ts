import { ref } from 'vue'

export interface Theme {
  theme: 'dark' | 'light'
  layout: 'side' | 'mix'
  mode: 'vertical' | 'inline' | 'horizontal'
  width: string
  height: string
  collapsed: boolean
  collapsedWidth: string
  headerTheme: boolean
  showSubMenuName: boolean
  showBreadcrumb: boolean
}

const theme = ref<Theme>({
  theme: 'light', // light, dark
  layout: 'mix', // side, mix
  mode: 'inline',
  width: '240px',
  height: '64px',
  collapsed: false,
  collapsedWidth: '80px',
  headerTheme: false,
  showSubMenuName: false, // 控制左侧菜单折叠时，是否显示文字
  showBreadcrumb: true // 是否显示面包屑
})

export const useTheme = function () {
  return theme
}
