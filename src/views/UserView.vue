<script setup lang="ts">
  import { colorFromUuid } from 'uuid-color'
  import account from '@/assets/account.svg?raw'

  const route = useRoute()
  const userStore = useUserStore()
  const friendStore = useFriendStore()

  const id = computed(() => route.params.id.toString())
  const { getFriend, isOnline } = friendStore
  const { isMe } = userStore
  const user = computed(() => (isMe(id.value) ? userStore.user : getFriend(id.value)))
  const badgeColor = computed(() =>
    isMe(id.value) ? 'info' : isOnline(user.value!.id) ? 'success' : 'error'
  )
  const badgeContent = computed(() => (isMe(id.value) ? 'You' : undefined))
  const iconColor = computed(() => (isMe(id.value) ? undefined : colorFromUuid(id.value)))
</script>

<template>
  <VMain class="d-flex flex-column fill-height justify-center align-center">
    <VBadge :color="badgeColor" :content="badgeContent">
      <div id="account-icon" class="mb-8" v-html="account"></div>
    </VBadge>
    <UserInfo :user="user!" />
  </VMain>
</template>

<style scoped>
  #account-icon {
    width: 180px;
    height: 180px;
    color: v-bind(iconColor);
  }
</style>
