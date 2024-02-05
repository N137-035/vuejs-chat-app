<script setup lang="ts">
  import { VTextField } from 'vuetify/components'
  import type { User } from '@/stores/user'

  export interface Props {
    hideId?: boolean
    user: User
  }

  const props = withDefaults(defineProps<Props>(), {
    hideId: false
  })

  const userStore = useUserStore()

  const id = computed(() => props.user.id)
  const username = computed(() => props.user.username)
  const { setUsername } = userStore
  const { copy, copied, isSupported } = useClipboard({ source: id.value })
  const usernameTextField = ref<InstanceType<typeof VTextField>>()
  const isUsernameValid = computed(() => usernameTextField.value?.isValid)
  const usernameRules = [
    (value?: string) => (value && value.length >= 3) || 'Username must be at least 3 characters.'
  ]
  const tooltipText = computed(() => (!copied.value ? 'Copy' : 'Copied!'))
  const copyButtonIcon = computed(() => (!copied.value ? 'mdi-content-copy' : 'mdi-content-paste'))

  defineExpose({ isUsernameValid })
</script>

<template>
  <VForm @submit.prevent>
    <VTextField
      ref="usernameTextField"
      :model-value="username"
      autofocus
      clearable
      label="Username"
      density="compact"
      variant="outlined"
      :rules="usernameRules"
      :disabled="$route.name !== 'home'"
      @update:model-value="(username) => setUsername(username)"
    />
    <VTextField
      v-if="!hideId"
      class="mt-2"
      :model-value="id"
      label="Id"
      density="compact"
      variant="outlined"
      hint="*Read only"
      persistent-hint
      readonly
    >
      <template v-if="isSupported" #append-inner>
        <VTooltip :text="tooltipText" location="top">
          <template #activator="{ props }">
            <VBtn
              v-bind="props"
              :icon="copyButtonIcon"
              size="small"
              variant="plain"
              @click="copy(id)"
            />
          </template>
        </VTooltip>
      </template>
    </VTextField>
  </VForm>
</template>

<style scoped>
  .v-form {
    width: 300px;
  }
</style>
