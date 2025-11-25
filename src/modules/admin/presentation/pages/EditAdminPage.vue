<template>
  <q-page class="q-pa-lg ">
    <h1 class="fs-25 no-margin">
      Editar administrador
    </h1>
    <AdminForm :is-update="true" :admin-id="+$route.params.id" />
  </q-page>
</template>

<script lang="ts" setup>
import AdminForm from '@modules/admin/presentation/components/AdminForm.vue';
import { useRoute } from 'vue-router';

const $route = useRoute();
</script>
