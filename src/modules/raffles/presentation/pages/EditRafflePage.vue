<template>
  <q-page class="q-pa-lg ">
    <RaffleForm :is-update="true" :raffle-id="+$route.params.id" />
  </q-page>
</template>

<script lang="ts" setup>
import RaffleForm from '@modules/raffles/presentation/components/RaffleForm.vue';
import { useRoute } from 'vue-router';

const $route = useRoute();
</script>
