<template>
  <div class="exception-wrap">
    <t-empty description="抱歉，服务器出错了">
      <template #icon>
        <t-icon name="error-circle-filled" class="text-error" />
      </template>
      <template #action>
        <Buttons />
      </template>
    </t-empty>
  </div>
</template>

<script setup lang="ts">
import Buttons from './buttons.vue'
</script>

<style lang="less" scoped>
@import './index.less';
</style>
