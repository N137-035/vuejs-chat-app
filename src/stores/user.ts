import { Peer } from 'peerjs'
import { defineStore } from 'pinia'
import { peerOptions, waitForPeerOpen } from '@/utils/peer'

export interface User {
  id: string
  username: string
}

export const useUserStore = defineStore('user', () => {
  const peer = ref<Peer>(new Peer('', peerOptions))
  const user = ref<User>({
    id: '',
    username: ''
  })

  const id = computed(() => user.value.id)
  const username = computed(() => user.value.username)

  function setUsername(username: string) {
    user.value.username = username
  }

  waitForPeerOpen(peer.value)
    .then(({ id }) => {
      user.value.id = id
    })
    .catch((error) => consola.error(error))

  return { peer, user, id, username, setUsername }
})
