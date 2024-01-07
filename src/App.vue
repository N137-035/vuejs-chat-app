<script setup lang="ts">
  import AppBar from '@/components/AppBar.vue'
  import NavigationDrawer from '@/components/NavigationDrawer.vue'
  import { toPrefixed } from '@/utils/package'

  const drawer = useLocalStorage(toPrefixed('DRAWER'), true)
</script>

<template>
  <VApp>
    <VLayout>
      <AppBar :drawer="drawer" @toggle-drawer="drawer = !drawer" />

      <NavigationDrawer :drawer="drawer" />

      <RouterView />
    </VLayout>
  </VApp>
</template>
