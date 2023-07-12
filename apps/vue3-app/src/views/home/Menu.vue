<template>
  <ul class="card flex flex-wrap">
    <li
      class="card-menu-item flex flex-col-reverse items-center"
      @click="onClickMenu('/components/store')"
    >
      <span class="icon-wrap" order="1">
        <van-icon class="icon" name="edit" />
      </span>
      <span class="text">Store</span>
    </li>
    <li
      class="card-menu-item flex flex-col-reverse items-center"
      @click="onClickMenu('/components/provide-inject')"
    >
      <span class="icon-wrap" order="3">
        <van-icon class="icon" name="share-o" />
      </span>
      <span class="text">Provide</span>
    </li>
    <li
      class="card-menu-item flex flex-col-reverse items-center"
      @click="onClickMenu('/components/bus')"
    >
      <span class="icon-wrap" order="2">
        <van-icon class="icon" name="guide-o" />
      </span>
      <span class="text">Bus</span>
    </li>
    <li
      class="card-menu-item flex flex-col-reverse items-center"
      @click="onClickMenu('/components/table')"
    >
      <span class="icon-wrap" order="4">
        <van-icon class="icon" name="notes-o" />
      </span>
      <span class="text">Table</span>
    </li>
    <li
      class="card-menu-item flex flex-col-reverse items-center"
      @click="onClickMenu('/components/sortable')"
    >
      <span class="icon-wrap" order="5">
        <van-icon class="icon" name="apps-o" />
      </span>
      <span class="text">Sortable</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const onClickMenu = (path: string) => {
  router.push(path)
}
</script>

<style lang="less" scoped>
.card {
  background: #fff;
  padding: 24px 0;
  //margin: -32px 32px 0 32px;
  //border-radius: 40px;
  //position: relative;
}

.card-menu-item {
  width: 20%;
  //&:nth-of-type(n + 4) {
  //  margin-top: 40px;
  //}
  .icon-wrap[order='1'] {
    background: #f87171;
  }
  .icon-wrap[order='2'] {
    background: #fbbf24;
  }
  .icon-wrap[order='3'] {
    background: #34d399;
  }
  .icon-wrap[order='4'] {
    background: #60a5fa;
  }
  .icon-wrap[order='5'] {
    background: #818cf8;
  }
  .icon-wrap[order='6'] {
    background: #a78bfa;
  }
  .icon-wrap {
    border-radius: 30%;
  }
  .icon {
    font-size: 48px;
    color: #fff;
    padding: 16px;
  }
  .text {
    margin-top: 16px;
    font-size: 24px;
  }
}
</style>
