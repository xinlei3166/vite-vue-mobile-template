<template>
  <t-swiper class="my-swipe" :interval="3000" :navigation="{ type: 'dots' }">
    <t-swiper-item class="swiper-item">明心见性</t-swiper-item>
    <t-swiper-item class="swiper-item">学习思考</t-swiper-item>
    <t-swiper-item class="swiper-item">坚持不懈</t-swiper-item>
    <t-swiper-item class="swiper-item">收放自如</t-swiper-item>
  </t-swiper>
  <Menu />
  <t-tabs v-model="active" class="tabs">
    <t-tab-panel label="热门推荐" :value="0">
      <List tab="热门推荐" :data="Array.from({ length: 10 })" />
    </t-tab-panel>
    <t-tab-panel label="时尚流行" :value="1">
      <List tab="时尚流行" :data="Array.from({ length: 10 })" />
    </t-tab-panel>
    <t-tab-panel label="经典怀旧" :value="2">
      <List tab="经典怀旧" :data="Array.from({ length: 10 })" />
    </t-tab-panel>
    <t-tab-panel label="其他类型" :value="3">
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
  border-radius: unset !important;
  .swiper-item {
    color: #fff;
    font-size: 32px;
    height: 300px;
    line-height: 300px;
    text-align: center;
    background-color: theme('colors.brand');
  }
}

.tabs {
  --td-tab-track-width: 80px;

  margin-top: 24px;
  padding-bottom: 112px;
  background-color: unset !important;
}
</style>
