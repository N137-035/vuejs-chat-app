import { find, some } from 'lodash'
import type { DataConnection } from 'peerjs'
import { defineStore } from 'pinia'
import type { User } from '@/stores/user'
import { setConnectionListeners } from '@/utils/peer'

export interface Message {
  id: string
  date: Date
  text: string
  announce?: boolean
}

export interface Friend extends User {
  conn: DataConnection
  messages: Message[]
}

export const useFriendStore = defineStore('friend', () => {
  const friends: Ref<Friend[]> = ref([])

  function friendExists(id: string) {
    return some(friends.value, { id })
  }

  function getFriend(id: string) {
    return find(friends.value, { id })
  }

  function addFriend(friend: Friend) {
    if (!friendExists(friend.id)) friends.value.push(friend)
  }

  function isOnline(id: string) {
    const friend = getFriend(id)
    return friend?.conn.open ?? false
  }

  async function waitForFriendAdded(id: string, timeout: number = 10000): Promise<Friend> {
    return new Promise((resolve, reject) => {
      const checkFriendAdded = setInterval(() => {
        const friend = getFriend(id)
        if (friend) resolve(friend)
      }, 100)

      setTimeout(() => {
        const error = new Error(`Timeout: Friend was not added within ${timeout} milliseconds.`)
        clearInterval(checkFriendAdded)
        reject(error)
      }, timeout)
    })
  }

  async function connectToFriend(id: string) {
    if (friendExists(id)) throw new Error('The friend already exists.')

    const userStore = useUserStore()
    const { peer } = storeToRefs(userStore)

    setConnectionListeners(peer.value.connect(id))
    await waitForFriendAdded(id)
  }

  function createMessage(id: string, text: string, announce?: boolean): Message {
    return {
      id,
      date: new Date(),
      text,
      announce
    }
  }

  function addMessage(id: string, message: Message) {
    if (!friendExists(id)) return
    const friend = getFriend(id)!
    friend.messages.push(message)
  }

  function sendMessage(id: string, text: string, announce?: boolean) {
    if (!friendExists(id)) return
    const userStore = useUserStore()

    const { conn } = getFriend(id)!
    const message = createMessage(userStore.id, text, announce)
    addMessage(id, message)
    conn.send({ message: { ...message, date: message.date.toISOString() } })
  }

  return {
    friends,
    friendExists,
    getFriend,
    addFriend,
    isOnline,
    waitForFriendAdded,
    connectToFriend,
    createMessage,
    addMessage,
    sendMessage
  }
})
