<script setup lang="ts">
  import { colorFromUuid } from 'uuid-color'
  import account from '@/assets/account.svg?raw'

  const userStore = useUserStore()

  const { user } = storeToRefs(userStore)

  const color = colorFromUuid(user.value.id)
</script>

<template>
  <VMain class="d-flex flex-column fill-height justify-center align-center">
    <div id="account-icon" class="mb-8" v-html="account"></div>
    <UserInfo :user="user" />
  </VMain>
</template>

<style scoped>
  #account-icon {
    width: 180px;
    height: 180px;
    color: v-bind(color);
  }
</style>
