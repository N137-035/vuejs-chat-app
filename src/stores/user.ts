import { Peer } from 'peerjs'
import { defineStore } from 'pinia'
import { peerOptions, setPeerListeners, waitForPeerOpen, type _Peer } from '@/utils/peer'

export interface User {
  id: string
  username: string
}

export const useUserStore = defineStore('user', () => {
  const peer: Ref<_Peer> = ref(setPeerListeners(new Peer('', peerOptions)))
  const user = ref<User>({
    id: '',
    username: ''
  })

  const id = computed(() => user.value.id)
  const username = computed(() => user.value.username)
  const isUserValid = computed(() => id.value && username.value)

  function isMe(id: string) {
    return id === user.value.id
  }

  function setUsername(username: string) {
    user.value.username = username
  }

  waitForPeerOpen(peer.value)
    .then(({ id }) => {
      user.value.id = id
    })
    .catch((error) => consola.error(error))

  return { peer, user, id, username, isUserValid, isMe, setUsername }
})
