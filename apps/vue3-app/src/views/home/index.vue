<template>
  <div class="card">
    <div class="title">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const title = import.meta.env.VITE_APP_TITLE
</script>

<style lang="less" scoped>
.card {
  padding: 20px;
  background: #fff;
}
</style>
