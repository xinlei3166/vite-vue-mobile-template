<template>
  <div class="title">A组件</div>
  <div class="title">当前结果：{{ number }}</div>
  <t-button theme="primary" size="small" block @click="onAdd">增加</t-button>
</template>

<script lang="ts">
import { defineComponent, ref, inject } from 'vue'
import { useEvent } from '@packages/hooks'

export default defineComponent({
  setup() {
    const event = useEvent()
    const number = ref(0)

    function onAdd() {
      number.value++
      event.emit('change-number', number.value)
    }

    return { number, onAdd }
  }
})
</script>

<style lang="less" scoped></style>
