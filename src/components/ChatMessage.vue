<script setup lang="ts">
  import { colorFromUuid } from 'uuid-color'
  import type { Message } from '@/stores/friend'

  export interface Props {
    message: Message
    color?: string
  }

  const { message, color = 'transparent' } = defineProps<Props>()

  const userStore = useUserStore()

  const isMe = computed(() => userStore.isMe(message.id))
  const messageStyle = computed(() => [
    'd-flex align-center',
    isMe.value ? 'justify-end' : 'justify-start'
  ])
  const textTimeStyle = computed(() => ['d-flex align-end', { 'flex-row-reverse': isMe.value }])
  const textStyle = computed(() => `px-2 py-1 text-left bg-${color} rounded`)
  const timeStyle = computed(() => [
    'px-1 text-caption text-disabled',
    isMe ? 'text-right' : 'text-left'
  ])
  const time = computed(() => message.date.toLocaleTimeString([], { timeStyle: 'short' }))
</script>

<template>
  <div :class="messageStyle">
    <AccountButton v-if="!isMe" class="my-n2" :id="message.id" :color="colorFromUuid(message.id)" />
    <div :class="textTimeStyle">
      <span :class="textStyle">{{ message.text }}</span>
      <span :class="timeStyle">{{ time }}</span>
    </div>
  </div>
</template>
