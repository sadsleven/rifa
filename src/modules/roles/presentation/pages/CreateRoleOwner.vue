<template>
  <q-page class="q-pa-lg">
    <h1 class="fs-25 no-margin">
      Crear rol de dueño
    </h1>
    <RoleForm :admin="false"></RoleForm>
  </q-page>
</template>

<script lang="ts" setup>
import RoleForm from '../components/RoleForm.vue';
</script>
