<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item>明心见性</van-swipe-item>
    <van-swipe-item>学习思考</van-swipe-item>
    <van-swipe-item>坚持不懈</van-swipe-item>
    <van-swipe-item>收放自如</van-swipe-item>
  </van-swipe>
  <Menu />
  <van-tabs v-model:active="active" class="tabs">
    <van-tab title="热门推荐">
      <List tab="热门推荐" :data="Array.from({ length: 10 })" />
    </van-tab>
    <van-tab title="时尚流行">
      <List tab="时尚流行" :data="Array.from({ length: 10 })" />
    </van-tab>
    <van-tab title="经典怀旧">
      <List tab="经典怀旧" :data="Array.from({ length: 10 })" />
    </van-tab>
    <van-tab title="其他类型">
      <List tab="其他类型" :data="Array.from({ length: 10 })" />
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Menu from './Menu.vue'
import List from './List.vue'

const active = ref(0)
</script>

<style lang="less" scoped>
.my-swipe {
  .van-swipe-item {
    color: #fff;
    font-size: 32px;
    line-height: 300px;
    text-align: center;
    background-color: @primary-color;
  }
  :deep(.van-swipe__indicators) {
    //bottom: 60px;
  }
}

.tabs {
  margin-top: 24px;
  padding-bottom: 100px;
  :deep(.van-tabs__line) {
    bottom: 31px;
  }
}
</style>
