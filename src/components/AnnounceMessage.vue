<script setup lang="ts">
  export interface Props {
    text: string
  }

  defineProps<Props>()
</script>

<template>
  <div class="d-flex align-center">
    <VDivider />
    <span class="flex-1-0 px-2 text-disabled">{{ text }}</span>
    <VDivider />
  </div>
</template>
