<template>
  <q-page class="q-pa-lg ">
    <BankForm :is-update="true"
      :bank-slug="Array.isArray($router.currentRoute.value.params.slug) ? $router.currentRoute.value.params.slug[0] : $router.currentRoute.value.params.slug" />
  </q-page>
</template>

<script lang="ts" setup>
import BankForm from '@modules/bank/presentation/components/BankForm.vue';
import { useRouter } from 'vue-router';

const $router = useRouter();
</script>
