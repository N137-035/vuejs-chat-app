<script setup lang="ts">
  const dialog = ref(false)
</script>

<template>
  <VListItem title="Friends List">
    <template #append>
      <AddFriendButton @add-friend="dialog = true" />
      <AddFriendDialog :dialog="dialog" @close-dialog="dialog = false" />
    </template>
  </VListItem>
</template>
