<template>
  <q-page class="q-pa-lg ">
    <h1 class="fs-25 no-margin">
      Editar rifa
    </h1>
    <RaffleForm :is-update="true" :raffle-slug="`${$route.params.slug}`" />
  </q-page>
</template>

<script lang="ts" setup>
import RaffleForm from '@modules/raffles/presentation/components/RaffleForm.vue';
import { useRoute } from 'vue-router';

const $route = useRoute();
</script>
