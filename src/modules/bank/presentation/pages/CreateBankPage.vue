<template>
  <q-page class="q-pa-lg ">
    <BankForm :is-update="false" />
  </q-page>
</template>

<script lang="ts" setup>
import BankForm from '@modules/bank/presentation/components/BankForm.vue';
</script>
