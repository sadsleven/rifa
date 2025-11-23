<template>
  <q-page class="q-pa-lg ">
    <q-table :rows="users" :columns="columns" flat :loading="loading" row-key="name" style="width: 100%;"
      :rows-per-page-options="[5, 10, 15, 20, 30]" :pagination-label="(firstRowIndex, endRowIndex, totalRowsNumber) => {
        return `${firstRowIndex}-${endRowIndex} de ${totalRowsNumber}`;
      }
        " rows-per-page-label="Usuarios por página">
      <!-- CREATE USER BTN -->
      <template v-slot:top-right>
        <q-btn unelevated :class="{
          'fs-14 q-mb-md': screenSize < 1065 && screenSize > 800,
          'full-width': screenSize < 1065,
        }" class="text-medium br-6" no-caps @click="
          $router.push({
            path: '/users/create',
          })
          " color="app-primary">
          <q-icon name="add" size="18px" class="q-pr-sm" />
          Crear usuario
        </q-btn>
      </template>

      <!-- ACTIONS COLUMN -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn unelevated dense flat round color="primary" icon="edit" @click="editUser(props.row)" />
          <q-btn unelevated dense flat round color="negative" icon="mdi-delete" @click="deleteUser(props.row)" />
        </q-td>
      </template>
    </q-table>
    <q-dialog v-model="confirmDelete" persistent>
      <q-card style="max-width: 450px; width: 100%;">
        <q-card-section class="row items-center justify-center">
          <div class="fs-20 text-inter-bold lh-24 text-center q-mt-md">¿Estas seguro de eliminar el usuario: {{
            `${usersStore.GetUser.firstName} ${usersStore.GetUser.lastName}`
          }}?</div>
        </q-card-section>

        <q-card-section class="row items-center justify-center no-padding">
          <q-icon name="mdi-alert-circle" color="app-danger" size="70px" />
        </q-card-section>

        <q-card-actions align="center">
          <q-btn no-caps :disable="loadingDelete" class="q-mt-md q-mb-md br-10" style="width: 84px;" label="Cancelar"
            color="app-danger" v-close-popup />
          <q-btn no-caps :disable="loadingDelete" class="q-mt-md q-mb-md br-10" style="width: 132px;"
            :loading="loadingDelete" label="Eliminar" color="primary" @click="handleDeleteUser()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { GetUsers, DeleteUserUseCase } from '@modules/users/domain/useCases';
import { useUsersStore } from '@modules/users/domain/store';
import { useAuthStore } from '@modules/auth/domain/store';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';

export default {
  setup() {
    // CONSTANTS
    const $router = useRouter();
    const usersStore = useUsersStore();
    const authStore = useAuthStore();
    const columns: any = [
      {
        name: 'name',
        required: true,
        label: 'Nombre',
        align: 'left',
        field: row => row,
        format: val => `${val.firstName} ${val.lastName}`,
        sortable: false
      },
      { name: 'userName', align: 'left', label: 'Usuario', field: 'userName', sortable: false },
      { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: false },
      { name: 'phone', align: 'left', label: 'Teléfono', field: 'phone' },
      {
        name: 'gender', align: 'left', label: 'Género',
        field: row => row,
        format: val => `${val.gender === 'male' ? 'Masculino' : ''}${val.gender === 'female' ? 'Femenino' : ''}${val.gender !== 'female' && val.gender !== 'male' ? 'No definido' : ''}`
      },
      {
        name: 'birthday', align: 'left', label: 'Cumpleaños',
        field: row => row,
        format: val => `${val.birthday && val.birthday !== ''
          ? dayjs(val.birthday).format('DD-MM-YYYY')
          : '-'
          }`
      },
      { name: 'actions', align: 'left', label: 'Acciones' }
    ];

    // REFS
    const screenSize = ref(0);
    const loading = ref<boolean>(false);
    const loadingDelete = ref<boolean>(false);
    const confirmDelete = ref<boolean>(false);
    const users = ref<any>([]);

    // FUNCTIONS
    function onResize() {
      screenSize.value = window.innerWidth;
    };

    const handleGetUsers = async () => {
      users.value = [];
      loading.value = true;

      try {
        const response: any = await GetUsers.handle();
        const filteredUsers = response.data.filter(user => user._id !== authStore.GetUser._id);
        users.value = filteredUsers;
      }
      catch (e) { }

      loading.value = false;
    };

    const editUser = async (user) => {
      usersStore.setUser(user);
      $router.push({ path: '/users/edit' });
    };

    const deleteUser = async (user) => {
      usersStore.setUser(user);
      confirmDelete.value = true;
    };

    const handleDeleteUser = async () => {
      loadingDelete.value = true;

      try {
        await DeleteUserUseCase.handle(usersStore.GetUser._id);
        handleGetUsers();
        confirmDelete.value = false;
      }
      catch (e) { }

      loadingDelete.value = false;
    };

    // LIFECYCLE HOOKS
    onMounted(() => {
      handleGetUsers();
      window.addEventListener('resize', onResize, { passive: true });
    });

    onUnmounted(() => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onResize);
      }
    });

    // RETURN TO COMPONENT
    return {
      screenSize,
      columns,
      users,
      loading,
      loadingDelete,
      editUser,
      deleteUser,
      confirmDelete,
      usersStore,
      handleDeleteUser
    };
  }
};
</script>
