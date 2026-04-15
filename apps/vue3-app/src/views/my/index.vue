<template>
  <div class="avatar-info">
    <div class="title-setting flex items-center justify-between">
      <span>我的</span>
      <t-icon class="title-setting-icon" size="24px" name="setting" />
    </div>
    <div class="flex items-center">
      <t-image shape="circle" class="w-25 h-25" :src="avatar" />
      <div class="username-phone">
        <div class="username">{{ userinfo.name }}</div>
        <div class="phone">{{ hiddenPhone(userinfo.phone) || '188******88' }}</div>
      </div>
      <t-icon class="text-white ml-auto" size="20px" name="chevron-right" />
    </div>
  </div>
  <div class="cell-group-wrap">
    <t-cell-group class="nav-menu">
      <t-cell title="Router" arrow hover @click="onClickCell('/components/router')">
        <template #left-icon>
          <t-icon name="home" class="text-textPrimary" size="18px" />
        </template>
      </t-cell>
      <t-cell title="Store" arrow hover @click="onClickCell('/components/store')">
        <template #left-icon>
          <t-icon name="edit-2" class="text-textPrimary" size="18px" />
        </template>
      </t-cell>
      <t-cell title="Provide" arrow hover @click="onClickCell('/components/provide-inject')">
        <template #left-icon>
          <t-icon name="share-1" class="text-textPrimary" size="18px" />
        </template>
      </t-cell>
      <t-cell title="Bus" arrow hover @click="onClickCell('/components/bus')">
        <template #left-icon>
          <t-icon name="control-platform" class="text-textPrimary" size="18px" />
        </template>
      </t-cell>
      <t-cell title="Table" arrow hover @click="onClickCell('/components/table')">
        <template #left-icon>
          <t-icon name="table-2" class="text-textPrimary" size="18px" />
        </template>
      </t-cell>
      <t-cell title="Sortable" arrow hover @click="onClickCell('/components/sortable')">
        <template #left-icon>
          <t-icon name="order" class="text-textPrimary" size="18px" />
        </template>
      </t-cell>
    </t-cell-group>
    <t-cell-group class="nav-menu">
      <t-cell title="Security Settings" arrow hover>
        <template #left-icon>
          <t-icon name="setting" class="text-textPrimary" size="18px" />
        </template>
      </t-cell>
      <t-cell title="Notification Settings" arrow hover>
        <template #left-icon>
          <t-icon name="notification" class="text-textPrimary" size="18px" />
        </template>
      </t-cell>
    </t-cell-group>
    <t-cell-group class="nav-menu">
      <t-cell title="Logout" @click="onLogout">
        <template #left-icon>
          <t-icon name="logout" class="text-textPrimary" size="18px" />
        </template>
      </t-cell>
    </t-cell-group>
  </div>
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

const onClickCell = (to: string) => {
  router.push(to)
}

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
    color: theme('colors.fontWhite2');
  }
}

.cell-group-wrap {
  padding-bottom: 112px;
}

.nav-menu {
  margin: 24px;
  :deep(.t-cell__left) {
    margin-top: 6px;
    margin-right: 20px;
  }
}
</style>
