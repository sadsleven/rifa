<template>
  <q-page class="q-pa-lg ">
    <RaffleForm :is-update="false" />
  </q-page>
</template>

<script lang="ts" setup>
import RaffleForm from '@modules/raffles/presentation/components/RaffleForm.vue';
</script>
