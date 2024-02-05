<script setup lang="ts">
  import { map } from 'lodash'
  import type { Message } from '@/stores/friend'
  import { toPrefixed } from '@/utils/package'

  export interface Props {
    id: string
    messages: Message[]
  }

  const props = defineProps<Props>()

  const isDark = useDark({
    storageKey: toPrefixed('COLOR_THEME')
  })
  const userStore = useUserStore()

  const { id, messages } = toRefs(props)
  const { isMe } = userStore
  const chatMessageColor = computed(() =>
    isMe(id.value) ? 'primary' : isDark.value ? 'grey-darken-4' : 'grey-lighten-4'
  )

  function differentDates(dates: Date[]) {
    const [date1, date2] = dates.map((date) => date.getTime())
    return date2 - date1 > 86400000
  }
</script>

<template>
  <VContainer>
    <div
      v-for="({ id, date, text, announce }, i) in messages"
      class="mb-2 text-center"
      :key="date.getTime()"
    >
      <VBadge
        v-if="i === 0 || differentDates(map(messages.slice(i - 1, i + 1), 'date'))"
        class="mb-2"
        :content="date.toLocaleDateString()"
        inline
      />
      <AnnounceMessage v-if="announce" :text="text" />
      <ChatMessage v-else class="ml-n4" :message="{ id, date, text }" :color="chatMessageColor" />
    </div>
  </VContainer>
</template>
