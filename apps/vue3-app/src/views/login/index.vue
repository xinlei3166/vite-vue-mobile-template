<template>
  <div class="login">
    <h2 class="login-title">登录账号</h2>
    <t-form
      class="login-form"
      :data="form"
      reset-type="initial"
      :requiredMark="false"
      labelAlign="left"
      @submit="onSubmit"
    >
      <div class="login-field">
        <t-form-item
          label="账号"
          name="account"
          :rules="[{ required: true, message: '请输入账号' }]"
        >
          <t-input borderless v-model="form.account" placeholder="请输入账号" />
        </t-form-item>
      </div>
      <div class="login-field">
        <t-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <t-input borderless v-model="form.password" type="password" placeholder="请输入密码" />
        </t-form-item>
      </div>
      <div class="btn-wrap">
        <t-button block theme="primary" type="submit">登录</t-button>
      </div>
    </t-form>
    <div class="tip-btn-wrap">
      <span>
        没有账号？
        <span class="text-btn" @click="onRegister">去注册</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { showToast } from '@packages/utils'
import { doSM3, setToken } from '@packages/utils'
import { login } from '@/api'
import { useMenuStore } from '@/store/menu'
import { useUserStore } from '@/store/user'

// ====================== Hooks ======================
const router = useRouter()

// ====================== Components ======================
const form = reactive<Record<string, any>>({
  // account: undefined,
  // password: undefined,
  account: 'admin',
  password: '123456'
})

const validateTwoPassword = (val: any) => {
  return !(form.password1 && val && form.password1 !== val)
}

const onSubmit = async (values: Record<string, any>) => {
  const res = await login({
    userAccount: form.account,
    password: doSM3(form.password)
  })
  if (!res || res.code !== 0) return
  setToken(res.data.accessToken)
  const menuStore = useMenuStore()
  const userStore = useUserStore()
  await userStore.setUserinfo()
  if (__DYNAMIC_MENU__) {
    await menuStore.setMenus()
  }
  await userStore.setUserinfo()
  showToast('登录成功')
  router.push({ path: '/' })
}

const onRegister = () => {
  router.push({ path: '/register' })
}
</script>

<style lang="less" scoped>
.login {
  padding: 32px 0;
}

.login-title {
  padding: 32px;
  font-size: 40px;
}

.login-form {
  margin-top: 16px !important;
  background-color: unset !important;
}

.login-field {
  background-color: #fff;
  margin-left: 32px;
  margin-right: 32px;
  &:not(:nth-last-of-type(1)) {
    margin-bottom: 32px !important;
  }
  :deep(.t-form__item) {
    padding-top: 20px;
    padding-bottom: 20px;
  }
}

.code-input-wrapper {
  display: flex;
  align-items: center;
}

.btn-wrap {
  margin: 64px 32px 32px 32px;
}

.tip-btn-wrap {
  margin: 40px 32px 0 32px;
  padding-right: 20px;
  text-align: right;
  font-size: 30px;
}
</style>
