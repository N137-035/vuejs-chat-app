<script setup lang="ts">
  import { colorFromUuid } from 'uuid-color'

  const friendStore = useFriendStore()

  const dialog = ref(false)
  const { friends } = storeToRefs(friendStore)
  const { isOnline } = friendStore
  const badgeColor = (id: string) => (isOnline(id) ? 'success' : 'error')
</script>

<template>
  <VList>
    <VListItem title="Friends List">
      <template #append>
        <AddFriendButton @add-friend="dialog = true" />
        <AddFriendDialog :dialog="dialog" @close-dialog="dialog = false" />
      </template>
    </VListItem>
    <VDivider />
    <VListItem
      v-for="{ id, username } in friends"
      :key="id"
      @click="$router.push({ name: 'chat', params: { id } })"
    >
      <template #prepend>
        <AccountButton :id="id" :color="colorFromUuid(id)" />
      </template>
      <VListItemTitle class="d-flex justify-space-between">
        {{ username }}
        <VBadge class="d-inline-flex" :color="badgeColor(id)" dot inline />
      </VListItemTitle>
    </VListItem>
  </VList>
</template>
