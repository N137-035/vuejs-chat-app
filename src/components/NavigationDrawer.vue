<script setup lang="ts">
  export interface Props {
    drawer?: boolean
  }

  const { drawer = true } = defineProps<Props>()
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
