<script setup lang="ts">
  import type { Props } from '@/components/NavigationDrawer.vue'

  defineProps<Props>()

  defineEmits<{
    toggleDrawer: []
  }>()

  const router = useRouter()
  const title = useTitle()
  const userStore = useUserStore()

  const { id } = storeToRefs(userStore)
</script>

<template>
  <VAppBar>
    <template #prepend>
      <VAppBarNavIcon variant="text" @click.stop="$emit('toggleDrawer')" />
    </template>
    <VAppBarTitle>
      <span @click="router.push({ name: 'home' })">{{ title }}</span>
    </VAppBarTitle>
    <template #append>
      <ThemeButton />
      <AccountButton :id="id" />
    </template>
  </VAppBar>
</template>

<style scoped>
  .v-app-bar-title span {
    cursor: pointer;
    user-select: none;
  }
</style>
