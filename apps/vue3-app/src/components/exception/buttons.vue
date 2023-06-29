<template>
  <van-button type="primary" class="bottom-button" @click="onGoHome">返回首页</van-button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const onGoHome = () => {
  router.push('/')
}
</script>

<style lang="less" scoped>
.bottom-button {
  width: 320px;
  height: 80px;
}
</style>
