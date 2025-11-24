<template>
  <q-page class="q-pa-lg ">
    <BankForm :is-update="true" :bank-id="+$route.params.id" />
  </q-page>
</template>

<script lang="ts" setup>
import BankForm from '@modules/bank/presentation/components/BankForm.vue';
import { useRoute } from 'vue-router';

const $route = useRoute();
</script>
