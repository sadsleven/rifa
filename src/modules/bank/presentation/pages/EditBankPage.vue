<template>
  <q-page class="q-pa-lg ">
    <h1 class="fs-25 no-margin">
      Editar banca
    </h1>
    <BankForm :is-update="true"
      :bank-slug="Array.isArray($router.currentRoute.value.params.slug) ? $router.currentRoute.value.params.slug[0] : $router.currentRoute.value.params.slug" />
  </q-page>
</template>

<script lang="ts" setup>
import BankForm from '@modules/bank/presentation/components/BankForm.vue';
import { useRouter } from 'vue-router';

const $router = useRouter();
</script>
