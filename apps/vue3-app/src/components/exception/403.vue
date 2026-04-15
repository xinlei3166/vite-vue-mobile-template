<template>
  <div class="exception-wrap">
    <t-empty description="抱歉，你无权访问该页面">
      <template #icon>
        <t-icon name="lock-on-filled" class="text-warning" />
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
