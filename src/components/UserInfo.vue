<script setup lang="ts">
  const username = ref('')
  const usernameRules = [
    (value?: string) => (value && value.length >= 3) || 'Username must be at least 3 characters.'
  ]
</script>

<template>
  <VForm @submit.prevent>
    <VTextField
      v-model="username"
      clearable
      label="Username"
      density="compact"
      variant="outlined"
      :rules="usernameRules"
    />
  </VForm>
</template>

<style scoped>
  .v-form {
    width: 300px;
  }
</style>
