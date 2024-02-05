<script setup lang="ts">
  import { nth } from 'lodash'
  import type MessagesContainer from '@/components/MessagesContainer.vue'

  const route = useRoute()

  const friendStore = useFriendStore()

  const id = computed(() => route.params.id.toString())
  const { getFriend } = friendStore
  const friend = computed(() => getFriend(id.value)!)
  const messages = computed(() => friend.value.messages)
  const messagesContainer = ref<InstanceType<typeof MessagesContainer>>()
  const messagesContainerElement = computed(() => messagesContainer.value?.$el)

  watch(
    () => messages.value.length,
    async () => {
      if (!messagesContainerElement?.value) return
      await nextTick()
      nth<HTMLElement>(messagesContainerElement.value.children, -1)!.scrollIntoView({
        behavior: 'smooth'
      })
    }
  )
</script>

<template>
  <VMain class="d-flex flex-column fill-height">
    <VAppBar class="text-center" :title="friend.username" elevation="1" density="compact" />
    <MessagesContainer ref="messagesContainer" :id="id" :messages="messages" />
    <VBottomNavigation>
      <MessageInput :id="id" />
    </VBottomNavigation>
  </VMain>
</template>

<style scoped>
  .v-container {
    height: calc(100vh - 168px);
    overflow-y: auto;
  }
</style>
