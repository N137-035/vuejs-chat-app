import { gitmojis } from 'gitmojis'

const gitmojiCodes = gitmojis.map((gitmoji) => gitmoji.code)

export default {
  extends: ['@commitlint/config-conventional', '@commitlint/parse'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:\w+:) (.*?)(?: \((#\d+)\))?$/,
      headerCorrespondence: ['type', 'subject', 'ticket'],
      issuePrefixes: ['#']
    }
  },
  rules: {
    'references-empty': [1, 'never'],
    'subject-empty': [2, 'never'],
    'subject-case': [2, 'always', 'sentence-case'],
    'type-enum': [2, 'always', gitmojiCodes],
    'type-empty': [2, 'never']
  }
}
