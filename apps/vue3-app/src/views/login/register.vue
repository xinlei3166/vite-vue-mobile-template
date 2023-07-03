<template>
  <div class="register">
    <h2 class="register-title">注册账号</h2>
    <van-form class="register-form" @submit="onSubmit">
      <van-cell-group class="register-field" inset>
        <van-field
          v-model="form.account"
          name="account"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请输入账号' }]"
        />
      </van-cell-group>
      <van-cell-group class="register-field" inset>
        <van-field
          v-model="form.phone"
          type="tel"
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          :rules="[
            { required: true, message: '请输入手机号' },
            { validator: validatePhone, message: '手机号合适不正确' }
          ]"
        />
      </van-cell-group>
      <van-cell-group class="register-field" inset>
        <van-field
          v-model="form.code"
          center
          type="tel"
          name="code"
          label="验证码"
          placeholder="请输入验证码"
        >
          <template #button>
            <van-button
              v-if="countdown === 0"
              :disabled="!validatePhone(form.phone)"
              size="small"
              type="primary"
              @click="onSendCode"
            >
              发送验证码
            </van-button>
            <van-button v-else disabled size="small">{{ countdown }}s后重试</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <van-cell-group class="register-field" inset>
        <van-field
          v-model="form.password1"
          type="password"
          name="password1"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
      </van-cell-group>
      <van-cell-group class="register-field" inset>
        <van-field
          v-model="form.password2"
          type="password"
          name="password2"
          label="确认密码"
          placeholder="请再次输入密码"
          :rules="[
            { required: true, message: '请再次输入密码' },
            { validator: validateTwoPassword, message: '两次密码输入不一致' }
          ]"
        />
      </van-cell-group>
      <div class="btn-wrap">
        <van-button block type="primary" native-type="submit">注册</van-button>
      </div>
    </van-form>
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
import { showToast } from 'vant'
import { login } from '@/api'
import { doSM3, phonePattern } from '@packages/utils'
import { useTimer } from '@packages/hooks'

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
