import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import typescriptEslintParser from '@typescript-eslint/parser'
import eslintPluginVue from 'eslint-plugin-vue'
import vueEslintParser from 'vue-eslint-parser'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const __gitignore = join(__dirname, '.gitignore')
const ignores = readFileSync(__gitignore, 'utf8')
  .split('\n')
  .filter((line) => line.length > 0 && !line.startsWith('#'))

export default [
  js.configs.recommended,
  ...compat.extends('@vue/eslint-config-typescript', '@vue/eslint-config-prettier/skip-formatting'),
  {
    files: ['**/*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}'],
    ignores,
    languageOptions: {
      ecmaVersion: 'latest',
      parser: vueEslintParser,
      parserOptions: {
        parser: typescriptEslintParser
      }
    },
    plugins: { vue: eslintPluginVue },
    rules: {
      ...eslintPluginVue.configs['vue3-essential'].rules
    }
  }
]
