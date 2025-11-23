<template>
  <q-page class="q-pa-lg">
    <RoleForm :is-update="true"></RoleForm>
  </q-page>
</template>

<script lang="ts">
import RoleForm from '../components/RoleForm.vue';

export default {
  components: {
    RoleForm
  },
  setup() {
    // RETURN TO COMPONENT
    return {
    };
  }
};
</script>
