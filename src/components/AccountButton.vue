<script setup lang="ts">
  export interface Props {
    id: string
    color?: string
  }

  defineProps<Props>()
</script>

<template>
  <VBtn
    icon="mdi-account"
    :color="color"
    variant="text"
    @click.stop="$router.push({ name: 'user', params: { id } })"
  />
</template>
