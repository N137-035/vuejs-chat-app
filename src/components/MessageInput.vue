<script setup lang="ts">
  import type { VTextField } from 'vuetify/components'

  export interface Props {
    id: string
  }

  const props = defineProps<Props>()

  const friendStore = useFriendStore()

  const { id } = toRefs(props)
  const { sendMessage } = friendStore
  const messageTextField = ref<InstanceType<typeof VTextField>>()
  const text = ref('')

  function send() {
    if (!text.value) return
    sendMessage(id.value, text.value)
    text.value = ''
  }

  onKeyStroke('Enter', send, { target: messageTextField })
</script>

<template>
  <VTextField
    ref="messageTextField"
    v-model="text"
    placeholder="message"
    variant="outlined"
    autofocus
    clearable
  >
    <template #append-inner>
      <VIcon icon="mdi-send" color="primary" @click="send" />
    </template>
  </VTextField>
</template>
