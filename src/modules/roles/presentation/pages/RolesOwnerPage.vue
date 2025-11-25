<template>
  <q-page class="q-pa-lg ">
    <h1 class="fs-25 no-margin">
      Roles del dueño
    </h1>
    <RolesPage :admin="false"></RolesPage>
  </q-page>
</template>

<script lang="ts" setup>
import RolesPage from '@modules/roles/presentation/components/RolesPage.vue';
</script>