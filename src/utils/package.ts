import pkg from '../../package.json' assert { type: 'json' }

export const { name, version } = pkg

export const PREFIX = [name.toUpperCase(), version].join('_')

export const toPrefixed = (...words: string[]) => [PREFIX, ...words].join('_')

export default pkg
