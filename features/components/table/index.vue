<template>
  <div class="table-card">
    <table class="table">
      <tr>
        <th class="van-hairline--surround">ID</th>
        <th class="van-hairline--surround">姓名</th>
        <th class="van-hairline--surround">邮箱</th>
      </tr>
      <tr v-for="item in data" :key="item.id">
        <td class="van-hairline--surround">{{ item.id }}</td>
        <td class="van-hairline--surround">{{ item.name }}</td>
        <td class="van-hairline--surround">{{ item.email }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed, reactive } from 'vue'
import type { Pagination } from '@packages/types'
import { useData } from '@packages/hooks'
import { getList } from '@/api'

const params = computed(() => ({}))
const { loading, data, pagination, init, onSearch } = useData(getList, {
  params,
  pagination: { pageSize: 10 } // 不传，默认为10
})

onBeforeMount(async () => {
  await init()
})

const search = reactive<Record<string, any>>({
  name1: undefined
})

async function onReset() {
  Object.keys(search).forEach(key => (search[key] = undefined))
  await onSearch()
}

async function onTableChange(pag: Pagination) {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  await init()
}

function onEdit() {
  window.open('https://baidu.com')
}

function onPreview() {
  window.open('https://baidu.com')
}
</script>

<style lang="less" scoped>
.table-card {
  background: #fff;
  padding: 24px;
}

.table {
  border-collapse: collapse;
  width: 100%;
  td,
  th {
    //border: 2px solid @text-color-3;
    text-align: center;
    color: @text-color;
    padding: 16px;
    word-break: break-word;
    font-size: 24px;
  }
  td {
    color: @text-color-2;
  }
}
</style>
