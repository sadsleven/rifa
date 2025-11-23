<template>
  <q-page class="q-pa-lg ">
    <RolesPage :admin="false"></RolesPage>
  </q-page>
</template>

<script lang="ts" setup>
import RolesPage from '@modules/roles/presentation/components/RolesPage.vue';
</script>