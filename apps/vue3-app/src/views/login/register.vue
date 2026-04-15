<template>
  <div class="register">
    <h2 class="register-title">注册账号</h2>
    <t-form class="register-form" @submit="onSubmit">
      <div class="register-field">
        <t-form-item name="account" :rules="[{ required: true, message: '请输入账号' }]">
          <t-input v-model="form.account" label="账号" placeholder="请输入账号" />
        </t-form-item>
      </div>
      <div class="register-field">
        <t-form-item
          name="phone"
          :rules="[
            { required: true, message: '请输入手机号' },
            { validator: validatePhone, message: '手机号格式不正确' }
          ]"
        >
          <t-input v-model="form.phone" type="tel" label="手机号" placeholder="请输入手机号" />
        </t-form-item>
      </div>
      <div class="register-field">
        <t-form-item name="code" label="验证码">
          <div class="code-input-wrapper">
            <t-input v-model="form.code" placeholder="请输入验证码" />
            <t-button
              v-if="countdown === 0"
              :disabled="!validatePhone(form.phone)"
              size="small"
              type="primary"
              @click="onSendCode"
            >
              发送验证码
            </t-button>
            <t-button v-else disabled size="small">{{ countdown }}s后重试</t-button>
          </div>
        </t-form-item>
      </div>
      <div class="register-field">
        <t-form-item name="password1" :rules="[{ required: true, message: '请输入密码' }]">
          <t-input v-model="form.password1" type="password" label="密码" placeholder="请输入密码" />
        </t-form-item>
      </div>
      <div class="register-field">
        <t-form-item
          name="password2"
          :rules="[
            { required: true, message: '请再次输入密码' },
            { validator: validateTwoPassword, message: '两次密码输入不一致' }
          ]"
        >
          <t-input
            v-model="form.password2"
            type="password"
            label="确认密码"
            placeholder="请再次输入密码"
          />
        </t-form-item>
      </div>
      <div class="btn-wrap">
        <t-button block type="primary" native-type="submit">注册</t-button>
      </div>
    </t-form>
    <div class="tip-btn-wrap">
      <span>
        已有账号？
        <span class="text-btn" @click="onLogin">去登录</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useTimer } from '@packages/hooks'
import { showToast } from '@packages/utils'
import { doSM3, phonePattern } from '@packages/utils'
import { login } from '@/api'

// ====================== Hooks ======================
const router = useRouter()
const { initTimer, clearTimer } = useTimer()

// ====================== Lifecycle ======================
onBeforeUnmount(() => {
  clearTimer()
})

// ====================== Components ======================
const form = reactive<Record<string, any>>({
  account: undefined,
  phone: undefined,
  code: undefined,
  password1: undefined,
  password2: undefined
})

const validatePhone = (val: any) => {
  return phonePattern.test(val)
}

const validateTwoPassword = (val: any) => {
  return !(form.password1 && val && form.password1 !== val)
}

const onSubmit = async (values: Record<string, any>) => {
  if (!form.code) {
    showToast('请输入验证码')
    return
  }
  console.log('onSubmit', values)
  showToast('注册成功')
  onLogin()
}

const countdown = ref(0)
const sendInterval = 60
const cb = () => {
  if (countdown.value === 0) {
    clearTimer()
    return
  }
  countdown.value = countdown.value - 1
}
const onSendCode = async () => {
  countdown.value = sendInterval
  initTimer(cb, 1)
}

const onLogin = () => {
  router.push({ path: '/login' })
}
</script>

<style lang="less" scoped>
.register {
  padding: 32px 0;
}

.register-title {
  padding: 32px;
  font-size: 40px;
}

.register-form {
  margin-top: 16px !important;
}

.register-field {
  &:not(:nth-last-of-type(1)) {
    margin-bottom: 32px !important;
  }
}

.btn-wrap {
  margin: 64px 32px 32px 32px;
}

.tip-btn-wrap {
  margin: 40px 32px 0 32px;
  padding-right: 20px;
  text-align: right;
  font-size: 28px;
}
</style>
