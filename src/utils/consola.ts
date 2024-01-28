import { createConsola } from 'consola'

export const consola = createConsola({
  level: import.meta.env.DEV ? 3 : 0
})
