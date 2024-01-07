<script setup lang="ts">
  import type { Props } from '@/components/NavigationDrawer.vue'
  import ThemeButton from '@/components/ThemeButton.vue'

  defineProps<Props>()

  defineEmits<{
    toggleDrawer: []
  }>()

  const router = useRouter()
  const title = useTitle()
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
    </template>
  </VAppBar>
</template>

<style scoped>
  .v-app-bar-title span {
    cursor: pointer;
    user-select: none;
  }
</style>
