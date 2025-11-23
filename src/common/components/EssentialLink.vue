<template>
  <q-item clickable @click="$router.push(link)" v-ripple class="text-primary">
    <q-item-section v-if="icon" avatar>
      <q-icon color="white" :name="icon" class="mini-i" />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-white">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  link?: string;
  icon?: string;
}

withDefaults(defineProps<EssentialLinkProps>(), {
  link: '#',
  icon: ''
});

</script>
