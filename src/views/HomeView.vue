<script setup lang="ts">
  import UserInfo from '@/components/UserInfo.vue'
  import { version } from '@/utils/package'

  const router = useRouter()
  const title = useTitle()
  const userStore = useUserStore()

  const userInfo = ref<InstanceType<typeof UserInfo> | null>(null)
  const { user } = storeToRefs(userStore)

  function start() {
    if (!userInfo?.value?.isUsernameValid) return
    router.push({ name: 'user', params: { id: user.value.id } })
  }
</script>

<template>
  <VMain class="d-flex flex-column fill-height justify-center align-center overflow-x-auto">
    <p class="text-h4 mb-2">{{ title }}</p>
    <p class="text-subtitle-1">v{{ version }}</p>
    <img class="my-8" width="180" src="@/assets/logo.svg" />
    <UserInfo ref="userInfo" :user="user" hide-id @submit="start" />
    <VBtn class="mt-2" :loading="!user.id" :disabled="!userInfo?.isUsernameValid" @click="start">
      Start
    </VBtn>
  </VMain>
</template>
