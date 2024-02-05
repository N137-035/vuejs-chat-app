<script setup lang="ts">
  const route = useRoute()
  const friendStore = useFriendStore()

  const id = computed(() => route.params.id.toString())
  const { getFriend } = friendStore
  const friend = computed(() => getFriend(id.value)!)
</script>

<template>
  <VMain class="fill-height">{{ friend.username }}</VMain>
</template>
