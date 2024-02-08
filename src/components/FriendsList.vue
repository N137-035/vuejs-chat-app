<script setup lang="ts">
  import { nth } from 'lodash'
  import { colorFromUuid } from 'uuid-color'
  import type { Message } from '@/stores/friend'

  const friendStore = useFriendStore()

  const { friends } = storeToRefs(friendStore)
  const { isOnline } = friendStore
  const badgeColor = (id: string) => (isOnline(id) ? 'success' : 'error')
  const lastMessage = (messages: Message[]) => nth(messages, -1)?.text
</script>

<template>
  <VList class="d-flex flex-column py-0 fill-height">
    <FriendsListTitle />
    <VDivider />
    <div class="overflow-y-auto">
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
        <VListItemSubtitle>{{ lastMessage(messages) }}</VListItemSubtitle>
      </VListItem>
    </div>
    <VSpacer />
    <slot name="append"></slot>
  </VList>
</template>
