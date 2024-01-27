import { defineStore } from 'pinia'

export interface User {
  id: string
  username: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User>({
    id: '00000000-0000-0000-0000-000000000000',
    username: ''
  })

  const id = computed(() => user.value.id)
  const username = computed(() => user.value.username)

  function setUsername(username: string) {
    user.value.username = username
  }

  return { user, id, username, setUsername }
})
