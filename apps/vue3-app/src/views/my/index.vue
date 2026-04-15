<template>
  <div class="avatar-info">
    <div class="title-setting flex items-center justify-between">
      <span>我的</span>
      <t-icon class="title-setting-icon" size="24px" name="setting" />
    </div>
    <div class="flex items-center">
      <t-image round width="50" height="50" :src="avatar" />
      <div class="username-phone">
        <div class="username">{{ userinfo.name }}</div>
        <div class="phone">{{ hiddenPhone(userinfo.phone) || '188******88' }}</div>
      </div>
      <t-icon class="text-white ml-auto" size="16px" name="chevron-right" />
    </div>
  </div>
  <t-cell-group class="nav-menu">
    <t-cell title="Router" to="/components/router" />
    <t-cell title="Store" to="/components/store" />
    <t-cell title="Provide" to="/components/provide-inject" />
    <t-cell title="Bus" to="/components/bus" />
    <t-cell title="Table" to="/components/table" />
    <t-cell title="Sortable" to="/components/sortable" />
  </t-cell-group>
  <t-cell-group class="nav-menu">
    <t-cell title="Security Settings" />
    <t-cell title="Notification Settings" />
  </t-cell-group>
  <t-cell-group class="nav-menu">
    <t-cell title="Logout" @click="onLogout" />
  </t-cell-group>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '@packages/utils'
import { removeToken, hiddenPhone } from '@packages/utils'
import { logout } from '@/api'
import avatar from '@/assets/avatar.png'
import { useMenuStore } from '@/store/menu'
import { useUserStore } from '@/store/user'

const router = useRouter()
const userStore = useUserStore()
const menuStore = useMenuStore()
const userinfo = computed(() => userStore.Userinfo)

const onLogout = async () => {
  const res = await logout()
  if (!res || res.code !== 0) return
  showToast('退出登录成功')
  router.push('/login')
  removeToken()
  userStore.cleanup()
  menuStore.cleanup()
}
</script>

<style lang="less" scoped>
.avatar-info {
  padding: 0 32px;
  width: 100%;
  height: 240px;
  background: theme('colors.brand');
}

.title-setting {
  height: 108px;
  font-size: 32px;
  color: #fff;
}

.username-phone {
  margin-left: 24px;
  .username {
    font-weight: 500;
    font-size: 32px;
    line-height: 44px;
    color: #fff;
  }
  .phone {
    margin-top: 2px;
    font-size: 24px;
    line-height: 36px;
    color: var(--td-text-disabled);
  }
}

.nav-menu {
  margin: 24px;
  :deep(.t-cell__left-icon) {
    margin-right: 12px;
  }
}
</style>
