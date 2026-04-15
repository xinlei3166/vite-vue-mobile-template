<template>
  <div class="exception-wrap">
    <t-empty description="抱歉，你访问的页面不存在">
      <template #icon>
        <t-icon name="file-unknown-filled" />
      </template>
      <template #action>
        <Buttons />
      </template>
    </t-empty>
  </div>
</template>

<script lang="ts" setup>
import Buttons from './buttons.vue'
</script>

<style lang="less" scoped>
@import './index.less';
</style>
