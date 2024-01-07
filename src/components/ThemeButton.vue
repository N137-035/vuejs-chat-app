<script setup lang="ts">
  import { toPrefixed } from '@/utils/package'

  const theme = useTheme()
  const isDark = useDark({
    storageKey: toPrefixed('COLOR_THEME'),
    onChanged(dark: boolean) {
      theme.global.name.value = dark ? 'dark' : 'light'
    }
  })
  const toggleDark = useToggle(isDark)

  const themeIcon = computed(() => (isDark.value ? 'mdi-weather-night' : 'mdi-weather-sunny'))
</script>

<template>
  <VBtn :icon="themeIcon" @click="toggleDark()" />
</template>
