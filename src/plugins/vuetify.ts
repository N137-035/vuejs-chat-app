import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const isDark = useDark()
const colors = { primary: '#42b883' }

export default createVuetify({
  theme: {
    defaultTheme: isDark.value ? 'dark' : 'light',
    themes: {
      dark: { colors },
      light: { colors }
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  }
})
