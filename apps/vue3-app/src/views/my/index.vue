<template>
  <div class="avatar-info">
    <div class="title-setting flex items-center justify-between">
      <span>我的</span>
      <van-icon class="title-setting-icon" size="24" name="setting-o" />
    </div>
    <div class="flex items-center">
      <van-image round width="50" height="50" :src="avatar" />
      <div class="username-phone">
        <div class="username">{{ userinfo.name }}</div>
        <div class="phone">{{ hiddenPhone(userinfo.phone) || '188******88' }}</div>
      </div>
      <van-icon class="text-white ml-auto" size="16" name="arrow" />
    </div>
  </div>
  <van-cell-group class="nav-menu" inset>
    <van-cell icon="wap-home-o" title="Router" is-link to="/components/router" />
    <van-cell icon="edit" title="Store" is-link to="/components/store" />
    <van-cell icon="share-o" title="Provide" is-link to="/components/provide-inject" />
    <van-cell icon="guide-o" title="Bus" is-link to="/components/bus" />
    <van-cell icon="notes-o" title="Table" is-link to="/components/table" />
    <van-cell icon="apps-o" title="Draggable" is-link to="/components/draggable" />
  </van-cell-group>
  <van-cell-group class="nav-menu" inset>
    <van-cell icon="setting-o" title="Security Settings" is-link />
    <van-cell icon="chat-o" title="Notification Settings" is-link />
  </van-cell-group>
  <van-cell-group class="nav-menu" inset>
    <van-cell icon="contact" title="Logout" @click="onLogout" />
  </van-cell-group>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from 'vant'
import { useUserStore } from '@/store/user'
import { useMenuStore } from '@/store/menu'
import avatar from '@/assets/avatar.png'
import { removeToken, hiddenPhone } from '@packages/utils'
import { logout } from '@/api'

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
  background: @primary-color;
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
    color: var(--van-gray-4);
  }
}

.nav-menu {
  margin: 24px;
  :deep(.van-cell__left-icon) {
    margin-right: 12px;
  }
}
</style>
