<template>
  <q-page class="q-pa-lg ">
    <h1 class="fs-25 no-margin">
      Crear banca
    </h1>
    <BankForm :is-update="false" />
  </q-page>
</template>

<script lang="ts" setup>
import BankForm from '@modules/bank/presentation/components/BankForm.vue';
</script>
