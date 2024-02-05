<script setup lang="ts">
  defineEmits<{
    addFriend: []
  }>()

  const route = useRoute()
  const userStore = useUserStore()

  const routeName = computed(() => route.name)
  const { id, username } = storeToRefs(userStore)
</script>

<template>
  <VTooltip text="Add a friend">
    <template #activator="{ props }">
      <VBtn
        v-bind="props"
        icon="mdi-plus"
        size="small"
        variant="plain"
        :disabled="routeName === 'home' || !id || !username"
        @click="$emit('addFriend')"
      />
    </template>
  </VTooltip>
</template>
