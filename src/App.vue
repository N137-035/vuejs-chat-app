<script setup lang="ts">
  const drawer = useLocalStorage(toPrefixed('DRAWER'), true)
</script>

<template>
  <VApp>
    <VLayout>
      <AppBar @toggle-drawer="drawer = !drawer" />

      <NavigationDrawer :drawer="drawer" />

      <Suspense>
        <RouterView />
      </Suspense>
    </VLayout>
  </VApp>
</template>
