import { Peer, type DataConnection, type PeerOptions } from 'peerjs'
import type { Message } from '@/stores/friend'
import type { User } from '@/stores/user'
import { name } from '@/utils/package'

export type UserData = { user: User }
export type MessageData = { message: Message }
export type PeerData = UserData | MessageData
export type Data<T> = T extends 'user' ? UserData : T extends 'message' ? MessageData : never

export type PeerOrDataConnection<T> = T extends Peer ? Peer : DataConnection

export const isData = <T extends 'user' | 'message'>(data: unknown, type: T): data is Data<T> => {
  if (!data || typeof data !== 'object') return false
  if (type in data) return true
  return false
}

export const peerOptions: PeerOptions | undefined = import.meta.env.DEV
  ? {
      host: '/',
      port: 9000,
      key: name
    }
  : undefined

export function waitForPeerOpen<T extends Peer | DataConnection>(
  peer: T,
  timeout: number = 10000
): Promise<PeerOrDataConnection<T>> {
  return new Promise((resolve, reject) => {
    const checkPeerOpen = setInterval(() => {
      if (peer.open) resolve(peer as PeerOrDataConnection<T>)
    }, 100)

    setTimeout(() => {
      const error = new Error(`Timeout: Peer did not open within ${timeout} milliseconds.`)
      clearInterval(checkPeerOpen)
      reject(error)
    }, timeout)
  })
}

export function setPeerListeners(peer: Peer) {
  return peer.on('open', (id) => {
    consola.success(`Peer opened: ${id}`)
    peer.on('connection', (conn) => {
      conn.on('open', connectionOnOpen(conn))
    })
  })
}

export function setConnectionListeners(conn: DataConnection) {
  return conn.on('open', connectionOnOpen(conn))
}

export const connectionOnOpen = (conn: DataConnection) => () => {
  consola.success(`Connection opened: ${conn.connectionId}`)

  const userStore = useUserStore()
  const friendStore = useFriendStore()

  const { user } = storeToRefs(userStore)
  const { addFriend, addMessage, sendMessage } = friendStore

  conn.send({ user: user.value })

  conn.on('data', (data) => {
    consola.info('Data received:', data)
    if (isData(data, 'user')) {
      const { user } = data
      addFriend({ ...user, conn, messages: [] })
      sendMessage(conn.peer, `${user.username} joined!`, true)
    }
    if (isData(data, 'message')) {
      const { message } = data
      message.date = new Date(message.date)
      addMessage(conn.peer, message)
    }
  })
  conn.on('close', connectionOnClose(conn))
}

export const connectionOnClose = (conn: DataConnection) => () => {
  const userStore = useUserStore()
  const friendStore = useFriendStore()

  const { username } = storeToRefs(userStore)
  const { sendMessage } = friendStore
  sendMessage(conn.peer, `${username.value} left.`, true)
}
