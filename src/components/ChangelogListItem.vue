<template>
  <VListItem title="Changelog" link @click="$router.push({ name: 'changelog' })">
    <template #append>
      <VTooltip text="Give me a star🥹">
        <template #activator="{ props }">
          <VBtn
            v-bind="props"
            icon="mdi-github"
            density="compact"
            variant="plain"
            href="https://github.com/N137-035/vuejs-chat-app"
            target="_blank"
            @click.stop
          />
        </template>
      </VTooltip>
    </template>
  </VListItem>
</template>
