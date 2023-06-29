<template>
  <ul class="list flex flex-col">
    <li v-for="(item, index) in data" :key="index" class="list-item flex">
      <div class="list-item-left">
        <img class="list-item-img" src="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg" />
      </div>
      <div class="list-item-right flex flex-col justify-between">
        <div class="list-item-title">这是一个{{ tab }}的标题</div>
        <div class="list-item-desc">这是一段描述</div>
        <div>
          <van-tag class="list-item-tag" plain round>标签</van-tag>
          <van-tag class="list-item-tag" plain round>标签</van-tag>
          <van-tag class="list-item-tag" plain round>标签</van-tag>
        </div>
        <div>
          <span class="list-item-price">0.3万/月</span>
          <span class="list-item-space">面积150平</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps({
  data: { type: Array, default: () => [] },
  tab: { type: String, default: '' }
})
</script>

<style lang="less" scoped>
.list {
}

.list-item {
  margin: 0 32px 24px 32px;
  &:first-of-type {
    margin-top: 24px;
  }
}

.list-item-left {
  width: 180px;
  height: 200px;
  .list-item-img {
    border-radius: 20px;
    width: 100%;
    height: 100%;
  }
}

.list-item-right {
  padding: 8px 24px;
  .list-item-title {
    font-size: 28px;
    font-weight: 500;
  }
  .list-item-desc {
    font-size: 24px;
    color: @text-color-2;
  }
  .list-item-tag + .list-item-tag {
    margin-left: 12px;
  }
  .list-item-price {
    margin-right: 16px;
    color: @danger-color;
  }
  .list-item-space {
    color: @text-color-2;
  }
  .list-item-price,
  .list-item-space {
    font-size: 26px;
    font-weight: 500;
  }
}
</style>
