<template>
  <q-page class="q-pa-lg ">
    <AdminForm :is-update="false" />
  </q-page>
</template>

<script lang="ts" setup>
import AdminForm from '@modules/admin/presentation/components/AdminForm.vue';
</script>
