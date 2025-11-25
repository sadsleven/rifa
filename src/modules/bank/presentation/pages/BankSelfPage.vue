<template>
  <q-page class="q-pa-lg">
    <h1 class="fs-25 no-margin q-pb-lg">
      Banca
    </h1>
    <div v-if="!isLoading" class="row q-col-gutter-md">
      <div class="col-12">
        <q-card>
          <q-card-section class="row">
            <div class="col-12 col-md-6 q-mb-md">
              <div class="text-semi-bold">
                Nombre:
              </div>
              <div>{{ bank.name ?? 'No disponible' }}</div>
            </div>
            <div class="col-12 col-md-6 q-mb-md">
              <div class="text-semi-bold">
                DBS:
              </div>
              <div>{{ bank.dbs ?? 'No disponible' }}</div>
            </div>
            <div class="col-12 col-md-6 q-mb-md">
              <div class="text-semi-bold">
                URL Endpoint:
              </div>
              <div>{{ bank.urlEndpoint ?? 'No disponible' }}</div>
            </div>
            <div class="col-12 col-md-6 q-mb-md">
              <div class="text-semi-bold">
                Secret JWT:
              </div>
              <div>{{ bank.secretJwt ?? 'No disponible' }}</div>
            </div>
            <div class="col-12 col-md-6 q-mb-md">
              <div class="text-semi-bold">
                Hash Bank:
              </div>
              <div>{{ bank.hashBank ?? 'No disponible' }}</div>
            </div>
            <div class="col-12 col-md-6 q-mb-md">
              <div class="text-semi-bold">
                URL Background:
              </div>
              <div>{{ bank.urlBg ?? 'No disponible' }}</div>
            </div>
            <div class="col-12 col-md-6 q-mb-md">
              <div class="text-semi-bold">
                URL Logo:
              </div>
              <div>{{ bank.urlLogo ?? 'No disponible' }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-else class="flex flex-center full-height">
      <q-spinner color="app-primary" size="3em" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@modules/auth/domain/store';
import { GetBankBySlugUseCase } from '@modules/bank/domain/useCases/get-bank-by-slug.useCase';
import type { IBank } from '@modules/bank/infrastructure/interfaces/bank.interface';

const authStore = useAuthStore();
const bank = ref<IBank>({
  id: 0,
  dbs: authStore.GetUser?.bankDbs,
  name: null,
  urlEndpoint: null,
  secretJwt: null,
  hashBank: null,
  urlBg: null,
  urlLogo: null,
});
const isLoading = ref(false);

onMounted(async () => {
  const slug = authStore.GetUser?.bankDbs;
  if (slug) {
    isLoading.value = true;
    try {
      const response: any = await GetBankBySlugUseCase.handle(slug);
      if (response) {
        bank.value = response.data;
      }
    } finally {
      isLoading.value = false;
    }
  }
});
</script>
