<template>
  <q-page class="q-pa-lg ">
    <h1 class="fs-25 no-margin">
      Crear rifa
    </h1>
    <RaffleForm :is-update="false" />
  </q-page>
</template>

<script lang="ts" setup>
import RaffleForm from '@modules/raffles/presentation/components/RaffleForm.vue';
</script>
