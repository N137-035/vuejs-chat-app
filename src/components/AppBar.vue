<script setup lang="ts">
  defineEmits<{
    toggleDrawer: []
  }>()

  const router = useRouter()
  const title = useTitle()
  const userStore = useUserStore()

  const { id, isUserValid } = storeToRefs(userStore)
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
      <AccountButton v-if="$route.name !== 'home' && isUserValid" :id="id" />
    </template>
  </VAppBar>
</template>

<style scoped>
  .v-app-bar-title span {
    cursor: pointer;
    user-select: none;
  }
</style>
