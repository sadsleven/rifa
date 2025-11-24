<template>
  <q-page class="q-pa-lg ">
    <AdminForm :is-update="true" :admin-id="+$route.params.id" />
  </q-page>
</template>

<script lang="ts" setup>
import AdminForm from '@modules/admin/presentation/components/AdminForm.vue';
import { useRoute } from 'vue-router';

const $route = useRoute();
</script>
