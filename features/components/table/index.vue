<template>
  <div class="table-card">
    <t-table row-key="id" :data="data" :columns="tableColumns"></t-table>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed, reactive } from 'vue'
import { useData } from '@packages/hooks'
import type { Pagination } from '@packages/types'
import { getList } from '@/api'
import { tableColumns } from './columns'

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

const onReset = async () => {
  Object.keys(search).forEach(key => (search[key] = undefined))
  await onSearch()
}

const onTableChange = async (pag: Pagination) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  await init()
}

const onEdit = () => {
  window.open('https://baidu.com')
}

const onPreview = () => {
  window.open('https://baidu.com')
}
</script>

<style lang="less" scoped>
.table-card {
  padding: 24px;
}
</style>
