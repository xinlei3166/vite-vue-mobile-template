<template>
  <van-search
    v-model="search.keyword"
    class="search"
    shape="round"
    placeholder="请输入搜索关键词"
  />
  <ul class="list flex flex-col">
    <li v-for="(item, index) in data" :key="index" class="list-item flex items-center">
      <div class="list-item-left flex-shrink-0">
        <span class="icon-wrap" order="1">
          <van-icon class="icon" name="star-o" />
        </span>
      </div>
      <div class="list-item-right flex flex-1 flex-col justify-between">
        <div class="list-item-title flex justify-between">
          <span class="list-item-title-text">生活号</span>
          <span class="list-item-title-time">18:15</span>
        </div>
        <div class="list-item-msg">了不起的打工人</div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const data = Array.from({ length: 20 })
const search = reactive<Record<string, any>>({
  keyword: ''
})
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 24px;
}

.list {
  padding-bottom: 100px;
}

.list-item {
  margin: 0 0 24px 0;
  padding: 12px 24px;
  background: #fff;
  //&:first-of-type {
  //  margin-top: 32px;
  //}
}

.list-item-left {
  margin-right: 24px;
  .icon-wrap {
    display: inline-block;
    border-radius: 15%;
    background: #60a5fa;
  }
  .icon {
    font-size: 64px;
    color: #fff;
    padding: 16px;
  }
}

.list-item-right {
  padding: 8px 0;
  .list-item-title {
    margin-bottom: 16px;
  }
  .list-item-title-text {
    font-size: 32px;
  }
  .list-item-title-time,
  .list-item-msg {
    font-size: 24px;
    color: @text-color-2;
  }
}
</style>
