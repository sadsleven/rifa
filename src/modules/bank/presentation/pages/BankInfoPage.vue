<template>
  <q-page class="q-pa-lg">
    <h1 class="fs-25 no-margin q-pb-lg">
      <q-btn flat round icon="arrow_back" color="app-primary" @click="$router.back()" />
      Banca {{ bank.name ?? slug }}
    </h1>
    <div v-if="!isLoading" class="row q-col-gutter-md">
      <div class="col-12" style="word-break: break-all !important;">
        <q-card>
          <q-card-section class="row">
            <div class="col-12 col-md-6 q-mb-md">
              <div class=" text-semi-bold">
                Nombre:
              </div>
              <div class="fs-18">{{ bank.name ?? 'No disponible' }}</div>
            </div>
            <div class="col-12 col-md-6 q-mb-md">
              <div class="text-semi-bold">
                DBS:
              </div>
              <div class="fs-18">{{ bank.dbs ?? 'No disponible' }}</div>
            </div>
            <div class="col-12 col-md-6 q-mb-md">
              <div class="text-semi-bold">
                URL Endpoint:
              </div>
              <div class="fs-18">{{ bank.urlEndpoint ?? 'No disponible' }}</div>
            </div>
            <div class="col-12 col-md-6 q-mb-md">
              <div class="text-semi-bold">
                Secret JWT:
              </div>
              <div class="fs-18">{{ bank.secretJwt ?? 'No disponible' }}</div>
            </div>
            <div class="col-12 col-md-6 q-mb-md">
              <div class="text-semi-bold">
                Hash Bank:
              </div>
              <div class="fs-18">{{ bank.hashBank ?? 'No disponible' }}</div>
            </div>
            <div class="col-12 col-md-6 q-mb-md">
              <div class="text-semi-bold">
                URL Background:
              </div>
              <div class="fs-18">{{ bank.urlBg ?? 'No disponible' }}</div>
            </div>
            <div class="col-12 col-md-6 q-mb-md">
              <div class="text-semi-bold">
                URL Logo:
              </div>
              <div class="fs-18">{{ bank.urlLogo ?? 'No disponible' }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="">
        <q-tabs v-model="tab" inline-label class="bg-app-primary text-white shadow-2">
          <q-tab name="raffles" icon="mdi-slot-machine" label="Rifas" />
          <q-tab name="admins" icon="mdi-shield-account" label="Administradores" />
          <q-tab name="users" icon="group" label="Usuarios" />
        </q-tabs>
      </div>
      <div class="col-12">
        <q-tab-panels v-model="tab" animated class="" keep-alive>
          <q-tab-panel name="raffles">
            <RaffleListComponent :dbs="bank.dbs"></RaffleListComponent>
          </q-tab-panel>

          <q-tab-panel name="admins">
            <AdminBanksComponent :dbs="bank.dbs"></AdminBanksComponent>
          </q-tab-panel>

          <q-tab-panel name="users">
            <UsersComponent :dbs="bank.dbs"></UsersComponent>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <div v-else class="flex flex-center full-height">
      <q-spinner color="app-primary" size="3em" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { GetBankBySlugUseCase } from '@modules/bank/domain/useCases/get-bank-by-slug.useCase';
import type { IBank } from '@modules/bank/infrastructure/interfaces/bank.interface';
import { useRoute } from 'vue-router';
import AdminBanksComponent from '@modules/admin/presentation/components/AdminBanksComponent.vue';
import UsersComponent from '@modules/user/presentation/components/UsersComponent.vue';
import RaffleListComponent from '@modules/raffles/presentation/components/RaffleListComponent.vue';

const route = useRoute()
const slug = `${route.params.slug}`
const bank = ref<IBank>({
  id: 0,
  dbs: null,
  name: null,
  urlEndpoint: null,
  secretJwt: null,
  hashBank: null,
  urlBg: null,
  urlLogo: null,
});
const isLoading = ref(false);
const tab = ref<'admins' | 'users' | 'raffles'>('raffles');

onMounted(async () => {
  if (slug) {
    isLoading.value = true;
    try {
      const response: any = await GetBankBySlugUseCase.handle(slug);
      if (response) {
        bank.value = response.data.data;
      }
    } finally {
      isLoading.value = false;
    }
  }
});
</script>
