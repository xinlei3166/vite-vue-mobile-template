<template>
  <div class="components-card card">
    <div class="title">Store</div>
    <t-input borderless v-model="name" clearable placeholder="请输入用户名">
      <template #suffix>
        <t-button size="small" theme="primary" @click="onSubmit">提交</t-button>
      </template>
    </t-input>
    <div class="title">当前用户：{{ userinfo.userName }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useUserStore } from '@/store/user'

export default defineComponent({
  setup() {
    const userStore = useUserStore()
    const userinfo = computed(() => userStore.userinfo)
    const name = ref(userinfo.value.userName)

    function onSubmit() {
      userStore.setUserName(name.value)
    }

    return { name, onSubmit, userinfo }
  }
})
</script>

<style lang="less" scoped></style>
