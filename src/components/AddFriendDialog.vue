<script setup lang="ts">
  import { VTextField } from 'vuetify/components'

  export interface Props {
    dialog?: boolean
  }

  const { dialog = false } = defineProps<Props>()

  const emit = defineEmits<{
    closeDialog: []
  }>()

  const router = useRouter()
  const friendStore = useFriendStore()

  const id = ref('')
  const loading = ref(false)
  const message = ref('')
  const idTextField = ref<InstanceType<typeof VTextField>>()
  const isIdValid = computed(() => Boolean(idTextField.value?.isValid))
  const idRules = [
    (value?: string) => {
      if (!value) return false
      if (friendExists(value)) return 'The friend already exists.'
      if (!/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/.test(value))
        return 'Invalid id'
      return true
    }
  ]
  const { friendExists, connectToFriend } = friendStore

  async function addFriend() {
    if (!isIdValid.value) return
    try {
      loading.value = true
      message.value = 'Connecting to your friend...'
      await connectToFriend(id.value)
      loading.value = false
      message.value = ''
      emit('closeDialog')
      router.push({ name: 'chat', params: { id: id.value } })
      id.value = ''
    } catch (error) {
      loading.value = false
      message.value = (error as Error).message
      consola.error(error)
    }
  }
</script>

<template>
  <VDialog :model-value="dialog" width="auto" persistent>
    <VCard prepend-icon="mdi-account-plus" title="Add a friend">
      <VCardText>
        <p>Paste your friend's id:</p>
        <VForm @submit.prevent="addFriend">
          <VTextField
            ref="idTextField"
            class="mt-2"
            v-model="id"
            autofocus
            clearable
            label="Id"
            density="compact"
            variant="outlined"
            :rules="idRules"
            :hint="message"
            persistent-hint
          />
        </VForm>
      </VCardText>
      <VCardActions class="d-flex justify-center">
        <VBtn @click="emit('closeDialog')">Cancel</VBtn>
        <VBtn
          v-if="!friendExists(id)"
          color="primary"
          :loading="loading"
          :disabled="!isIdValid"
          @click="addFriend"
        >
          Add
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>
  .v-text-field {
    width: 300px;
  }
</style>
