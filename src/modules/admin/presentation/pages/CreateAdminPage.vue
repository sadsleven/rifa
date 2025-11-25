<template>
  <q-page class="q-pa-lg ">
    <h1 class="fs-25 no-margin">
      Crear administrador
    </h1>
    <AdminForm :is-update="false" />
  </q-page>
</template>

<script lang="ts" setup>
import AdminForm from '@modules/admin/presentation/components/AdminForm.vue';
</script>
