<template>
  <q-layout view="hHr lpr ffr">
    <q-page-container>
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <component :is="Component"></component>
        </template>
      </RouterView>
    </q-page-container>
  </q-layout>
</template>
<script setup lang="ts">
</script>
