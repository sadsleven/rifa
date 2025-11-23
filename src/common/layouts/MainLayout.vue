<template>
  <q-layout view="lhh lpR lFf" class="bg-white">
    <div class="custom-header-before">
    </div>
    <q-header dense class="flex row bg-white custom-header" height-hint="96" style="height: 96px;">
      <q-toolbar class="justify-center">
        <q-toolbar-title>
          <div class="flex justify-start items-center q-pl-md">
            <q-icon name="mdi-tab" color="app-primary" size="24px" />
            <h1 class="text-black q-ml-sm fs-20 text-weight-bold lh-24 ls-1">
              Dashboard
            </h1>
          </div>
        </q-toolbar-title>

        <q-btn color="app-primary" class="user-menu" flat rounded label="" no-caps>
          <q-avatar size="36px">
            <q-icon name="mdi-account-circle" color="app-primary" size="36px" />
          </q-avatar>
          <div class="q-px-sm ">
            <div class="text-black fs-14 text-inter-bold lh-18 ls-1 text-start text-ellipsis-1-line"
              style="max-width: 190px;">{{ `${authStore.raUser?.name ?? ''}` }}
            </div>
            <div class="text-grey-6 fs-10 text-inter-regular lh-14 ls-1 text-start text-ellipsis-1-line"
              style="max-width: 190px;">{{ authStore.raUser?.email ?? '' }}</div>
          </div>
          <q-icon name="mdi-chevron-down" color="black" size="24px" />
          <q-menu fit anchor="bottom right" self="top right">
            <q-list style="min-width: 100px">
              <q-item color="app-primary" clickable v-close-popup @click="confirmLogout = true">
                <q-item-section avatar>
                  <q-icon color="app-primary" name="mdi-logout" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-app-primary">Cerrar Sesión</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>


      </q-toolbar>
    </q-header>

    <q-drawer show-if-above :mini="miniState" :model-value="$q.screen.gt.sm" :width="250"
      style="position: relative !important;" :breakpoint="500" class="bg-app-primary">

      <q-scroll-area class="fit" style="user-select: none;">
        <q-list class="flex column" style="height: 100vh;">
          <q-item class="pt-13 flex items-center" :v-ripple="false">
            <q-item-section avatar>
              <q-icon v-if="!miniState" size="50px" class="ml-5" name="mdi-hand-coin"></q-icon>
              <q-icon v-if="miniState" size="25px" class="ml-5" name="mdi-hand-coin"></q-icon>
              <q-btn v-if="miniState" color="white" flat round size="11px" @click="drawerClick">
                <q-icon name="mdi-arrow-collapse-right" />
              </q-btn>
            </q-item-section>
            <span v-if="!miniState" class="text-semi-bold fs-20">Rifa Admin</span>
            <q-item-section>
              <q-btn color="white" flat round size="11px" style="right: 10px;position: absolute;" @click="drawerClick">
                <q-icon name="mdi-arrow-collapse-left" />
              </q-btn>
            </q-item-section>
          </q-item>

          <div class="text-white q-pl-md fs-12 q-mt-md q-mb-md">
            Menu
          </div>

          <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />

          <q-space />


          <div class="userCard" v-if="!miniState">
            <q-avatar>
              <q-icon name="mdi-account-circle" color="app-secondary" size="48px" />
            </q-avatar>
            <div class="text-white q-ml-md" v-if="!miniState">
              <div class="userCard-name text-ellipsis-1-line" style="max-width: 130px;">{{
                `${authStore.raUser?.name ?? ''}` }}</div>
              <div class="userCard-subtitle text-ellipsis-1-line" style="max-width: 130px;">{{ authStore.raUser?.email
                ?? '' }}</div>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="confirmLogout" persistent>
      <q-card style="max-width: 450px; width: 100%;">
        <q-card-section class="row items-center justify-center">
          <div class="fs-20 text-inter-bold lh-24 text-center q-mt-md text-black">¿Estas seguro de cerrar la sesión?
          </div>
        </q-card-section>

        <q-card-section class="row items-center justify-center no-padding">
          <q-icon name="mdi-alert-circle" color="app-danger" size="70px" />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn no-caps :disable="loading" class="q-mt-md q-mb-md br-6 text-semi-bold " style="width: 84px;"
            label="Cancelar" color="app-danger" v-close-popup />
          <q-btn no-caps :disable="loading" class="q-mt-md q-mb-md br-6 text-semi-bold " style="width: 132px;"
            :loading="loading" label="Si, cerrar sesión" color="app-primary" @click="handleLogout" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { EssentialLinkProps } from '@common/components/EssentialLink.vue';
import EssentialLink from '@common/components/EssentialLink.vue';
import { LogoutUseCase, AuthMeUseCase } from '@modules/auth/domain/useCases';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@modules/auth/domain/store';
import { getNotifyDefaultOptions } from '../helpers/notify-default-options.helper';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const $router = useRouter();
const authStore = useAuthStore();

const miniState = ref(false);
const confirmLogout = ref<boolean>(false);
const loading = ref<boolean>(false);

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'DashBoard',
    icon: 'mdi-tab',
    link: '/dashboard'
  },
  {
    title: 'Admins',
    icon: 'mdi-shield-account',
    link: '/users'
  },
  {
    title: 'Dueños',
    icon: 'mdi-account',
    link: '/owners'
  },
  {
    title: 'Roles admin',
    icon: 'mdi-lock',
    link: '/roles'
  },
  {
    title: 'Roles dueños',
    icon: 'mdi-account-lock',
    link: '/roles/owners'
  },
  {
    title: 'Bancas',
    icon: 'mdi-bank',
    link: '/banks'
  },
  {
    title: 'Rifas',
    icon: 'mdi-slot-machine',
    link: '/raffles'
  }
];

const drawerClick = (e) => {
  miniState.value = !miniState.value;
  e.stopPropagation();
};

const handleLogout = async () => {
  loading.value = true;
  try {
    await LogoutUseCase.handle();
  }
  catch {
  }

  await $router.push('/');
  $q.notify({
    ...getNotifyDefaultOptions('success'),
    message: 'Cierre de sesión exitoso.'
  })

  loading.value = false;
};

const handleAuthMe = async () => {
  try {
    await AuthMeUseCase.handle();
  }
  catch { }
};

onMounted(async () => {
  await handleAuthMe();
});


</script>

<style>
.userCard {
  padding: 15px;
  width: 90%;
  border-radius: 8px;
  margin-left: 5%;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  border: rgb(149, 210, 61) solid 1px;
  justify-content: flex-start;
  background: linear-gradient(98.06deg, rgba(149, 210, 61, 0.2) 11.78%, rgba(64, 29, 108, 0.05) 87.81%);
}

.userCard .userCard-name {
  font-size: 13px;
  font-weight: 600;
}

.userCard .userCard-subtitle {
  font-size: 10px;
}

.custom-header {
  border-bottom: #EBEBEB solid 1px;
  border-top-left-radius: 30px;
  z-index: 2000;
}

.custom-header-before {
  width: 290px;
  height: 50px;
  display: block;
  position: absolute;
  left: 0px;
  z-index: 999;
  background-color: #051923;
}
</style>
