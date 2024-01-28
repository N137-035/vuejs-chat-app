import type { Peer, PeerOptions } from 'peerjs'
import { name } from '@/utils/package'

export const peerOptions: PeerOptions | undefined = import.meta.env.DEV
  ? {
      host: '/',
      port: 9000,
      key: name
    }
  : undefined

export function waitForPeerOpen(peer: Peer, timeout: number = 10000): Promise<Peer> {
  return new Promise((resolve, reject) => {
    const checkPeerOpen = setInterval(() => {
      if (peer.open) resolve(peer)
    }, 100)

    setTimeout(() => {
      const error = new Error(`Timeout: Peer did not open within ${timeout} milliseconds.`)
      clearInterval(checkPeerOpen)
      reject(error)
    }, timeout)
  })
}
