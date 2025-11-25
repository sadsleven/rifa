<template>
  <q-layout view="lHh Lpr lFf" class="bg-white">
    <q-header dense elevated class="flex row bg-white custom-header" height-hint="70" style="height: 70px;">
      <q-toolbar class="justify-center">
        <q-toolbar-title>
          <q-btn flat dense round class="mb-1" :class="{ 'mr-7': !$q.screen.lt.md }" color="app-primary"
            aria-label="Menu" @click="toggleLeftDrawer" icon="mdi-menu">
          </q-btn>
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

    <q-drawer v-model="leftDrawerOpen" style="overflow-y: scroll" show-if-above :mini="miniState" :width="250"
      :breakpoint="500" class="bg-app-primary">

      <q-scroll-area class="fit" style="user-select: none;">
        <q-list class="flex column" style="height: 100vh;">
          <q-item class="pt-13 flex items-center" :v-ripple="false">
            <q-item-section avatar>
              <q-icon v-if="!miniState" size="50px" color="app-secondary" class="ml-5" name="mdi-hand-coin"></q-icon>
              <q-icon v-if="miniState" size="25px" color="app-secondary" class="ml-5" name="mdi-hand-coin"></q-icon>
              <q-btn v-if="miniState" color="white" flat round size="11px" @click="drawerClick">
                <q-icon name="mdi-arrow-collapse-right" />
              </q-btn>
            </q-item-section>
            <span v-if="!miniState" class="text-semi-bold text-app-secondary fs-17 mr-5">Rifa Admin</span>
            <q-item-section>
              <q-btn color="white" flat round size="11px" style="right: 10px;position: absolute;" @click="drawerClick">
                <q-icon name="mdi-arrow-collapse-left" />
              </q-btn>
            </q-item-section>
          </q-item>

          <div class="text-white q-pl-sm fs-12 q-mt-md q-mb-md">
            Menu
          </div>

          <EssentialLink v-for="link in links" :key="link.title" v-bind="link" />

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
          <div class="fs-20 text-semi-bold lh-24 text-center text-black q-mt-md">¿Estas seguro de cerrar la sesión?
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
import { computed, onMounted, ref } from 'vue';
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
const leftDrawerOpen = ref(false);

const adminLinks: EssentialLinkProps[] = [
  {
    title: 'Administradores',
    icon: 'mdi-shield-account',
    link: '/admins'
  },
  {
    title: 'Roles de administradores',
    icon: 'mdi-lock',
    link: '/roles'
  },
  {
    title: 'Bancas',
    icon: 'mdi-bank',
    link: '/banks'
  },
];

const ownerLinks: EssentialLinkProps[] = [
  {
    title: 'Banca',
    icon: 'mdi-bank',
    link: '/banks/self'
  },
  {
    title: 'Administradores',
    icon: 'mdi-shield-account',
    link: '/admins'
  },
  {
    title: 'Roles del dueño',
    icon: 'mdi-account-lock',
    link: '/roles/owners'
  },
  {
    title: 'Rifas',
    icon: 'mdi-slot-machine',
    link: '/raffles/self'
  }
];

const links = computed(() => {
  if (authStore.GetUser?.bankDbs) {
    return ownerLinks
  }
  return adminLinks;
});

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

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

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
