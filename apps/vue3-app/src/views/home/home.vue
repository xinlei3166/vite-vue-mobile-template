<template>
  <t-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <t-swipe-item>明心见性</t-swipe-item>
    <t-swipe-item>学习思考</t-swipe-item>
    <t-swipe-item>坚持不懈</t-swipe-item>
    <t-swipe-item>收放自如</t-swipe-item>
  </t-swipe>
  <Menu />
  <t-tabs v-model:value="active" class="tabs">
    <t-tab-panel label="热门推荐">
      <List tab="热门推荐" :data="Array.from({ length: 10 })" />
    </t-tab-panel>
    <t-tab-panel label="时尚流行">
      <List tab="时尚流行" :data="Array.from({ length: 10 })" />
    </t-tab-panel>
    <t-tab-panel label="经典怀旧">
      <List tab="经典怀旧" :data="Array.from({ length: 10 })" />
    </t-tab-panel>
    <t-tab-panel label="其他类型">
      <List tab="其他类型" :data="Array.from({ length: 10 })" />
    </t-tab-panel>
  </t-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import List from './List.vue'
import Menu from './Menu.vue'

const active = ref(0)
</script>

<style lang="less" scoped>
.my-swipe {
  .t-swipe-item {
    color: #fff;
    font-size: 32px;
    line-height: 300px;
    text-align: center;
    background-color: @primary-color;
  }
  :deep(.t-swipe__indicators) {
    //bottom: 60px;
  }
}

.tabs {
  margin-top: 24px;
  padding-bottom: 100px;
  :deep(.t-tabs__line) {
    bottom: 31px;
  }
}
</style>
