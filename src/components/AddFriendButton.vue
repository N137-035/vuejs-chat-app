<script setup lang="ts">
  const userStore = useUserStore()

  const { id } = storeToRefs(userStore)
</script>

<template>
  <VTooltip text="Add a friend">
    <template #activator="{ props }">
      <VBtn v-bind="props" icon="mdi-plus" size="small" variant="plain" :disabled="!id" />
    </template>
  </VTooltip>
</template>
