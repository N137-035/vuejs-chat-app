<script setup lang="ts">
  import DOMPurify from 'dompurify'
  import { parse } from 'marked'
  import CHANGELOG from '../../CHANGELOG.md?raw'

  const changelog = DOMPurify.sanitize(await parse(CHANGELOG))
</script>

<template>
  <VMain class="h-screen overflow-x-auto">
    <VContainer class="pl-8">
      <div v-html="changelog"></div>
    </VContainer>
  </VMain>
</template>
