<script setup lang="ts">
  export interface Props {
    drawer?: boolean
  }

  withDefaults(defineProps<Props>(), {
    drawer: true
  })
</script>

<template>
  <VNavigationDrawer :model-value="drawer" permanent>
    <FriendsList>
      <template #append>
        <ChangelogListItem />
      </template>
    </FriendsList>
  </VNavigationDrawer>
</template>
