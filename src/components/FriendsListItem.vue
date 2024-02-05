<script setup lang="ts">
  import { nth } from 'lodash'
  import { colorFromUuid } from 'uuid-color'

  const friendStore = useFriendStore()

  const { friends } = storeToRefs(friendStore)
  const { isOnline } = friendStore
  const badgeColor = (id: string) => (isOnline(id) ? 'success' : 'error')
</script>

<template>
  <VListItem
    v-for="{ id, username, messages } in friends"
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
    <VListItemSubtitle>{{ nth(messages, -1)?.text }}</VListItemSubtitle>
  </VListItem>
</template>
