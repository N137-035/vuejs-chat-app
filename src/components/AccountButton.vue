<script setup lang="ts">
  const userStore = useUserStore()

  const { id } = storeToRefs(userStore)
</script>

<template>
  <VBtn icon="mdi-account" @click="$router.push({ name: 'user', params: { id } })" />
</template>
