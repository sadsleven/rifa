<template>
  <q-page class="q-pa-lg">
    <h1 class="fs-25 no-margin">
      Editar rol de administrador
    </h1>
    <RoleForm :is-update="true"></RoleForm>
  </q-page>
</template>

<script lang="ts" setup>
import RoleForm from '../components/RoleForm.vue';
</script>
