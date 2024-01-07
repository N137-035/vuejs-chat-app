<script setup lang="ts">
  import UserInfo from '@/components/UserInfo.vue'
  import { version } from '@/utils/package'

  const title = useTitle()
</script>

<template>
  <VMain class="d-flex flex-column fill-height justify-center align-center overflow-x-auto">
    <p class="text-h4 mb-2">{{ title }}</p>
    <p class="text-subtitle-1">v{{ version }}</p>
    <img class="my-8" width="180" src="@/assets/logo.svg" />
    <UserInfo />
    <VBtn>Start</VBtn>
  </VMain>
</template>
