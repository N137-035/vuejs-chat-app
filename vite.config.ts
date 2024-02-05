import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          '@vueuse/core': ['useClipboard', 'useDark', 'useLocalStorage', 'useTitle', 'useToggle'],
          pinia: ['storeToRefs'],
          vuetify: ['useTheme'],
          '@/stores/user': ['useUserStore'],
          '@/stores/friend': ['useFriendStore'],
          '@/utils/consola': ['consola']
        }
      ],
      dts: './src/auto-imports.d.ts'
    }),
    Components({
      dts: './src/components.d.ts'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
