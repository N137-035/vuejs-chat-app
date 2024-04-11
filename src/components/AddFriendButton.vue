<script setup lang="ts">
  defineEmits<{
    addFriend: []
  }>()

  const userStore = useUserStore()

  const { isUserValid } = storeToRefs(userStore)
</script>

<template>
  <VTooltip text="Add a friend">
    <template #activator="{ props }">
      <VBtn
        v-bind="props"
        icon="mdi-plus"
        size="small"
        variant="plain"
        :disabled="!isUserValid"
        @click="$emit('addFriend')"
      />
    </template>
  </VTooltip>
</template>
