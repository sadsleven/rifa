<template>
    <div class="full-width column">
        <q-table binary-state-sort @request="onRequest" v-model:pagination="pagination" loading-label="Cargando"
            :rows="roles" :columns="columns" flat :loading="loading || loadingPagination" row-key="name"
            style="width: 100%;" :rows-per-page-options="[10, 15, 20, 30]"
            :pagination-label="(start, end, total) => `${start}-${end} de ${total}`"
            rows-per-page-label="Roles por página">
            <!-- CREATE ROLE BTN -->
            <template v-slot:top-right>
                <q-btn unelevated :class="{
                    'fs-14 q-mb-md': $q.screen.width < 1065 && $q.screen.width > 800,
                    'full-width': $q.screen.width < 1065,
                }" class="text-medium br-6" no-caps @click="
                    $router.push({
                        path: `/roles${!props.admin ? '/owners' : ''}/create`,
                    })
                    " color="app-primary">
                    <q-icon name="add" size="18px" class="q-pr-sm" />
                    Crear rol
                </q-btn>
            </template>

            <!-- ACTIONS COLUMN -->
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn unelevated dense flat round color="app-primary" icon="edit" @click="editRole(props.row)" />
                    <q-btn unelevated dense flat round color="app-danger" icon="mdi-delete"
                        @click="deleteRole(props.row)" />
                </q-td>
            </template>

            <template #no-data="{ icon }">
                <div class="full-width row flex-center text-lv-tertiary q-gutter-sm">
                    <q-icon v-if="!loading" size="2em" :name="icon" />
                    <q-spinner color="app-primary" v-else size="2em" />
                    <span class="text-medium">{{ !loading ? 'No se encontraron resultados.' : 'Cargando' }}</span>
                </div>
            </template>
        </q-table>
        <q-dialog v-model="confirmDelete" persistent>
            <q-card style="max-width: 450px; width: 100%;">
                <q-card-section class="row items-center justify-center">
                    <div class="fs-20 text-inter-bold lh-24 text-center text-black q-mt-md">¿Estas seguro de eliminar el
                        rol: {{
                            `${role.name}`
                        }}?</div>
                </q-card-section>

                <q-card-section class="row items-center justify-center no-padding">
                    <q-icon name="mdi-alert-circle" color="app-danger" size="70px" />
                </q-card-section>

                <q-card-actions align="center">
                    <q-btn no-caps :disable="loadingDelete" class="q-mt-md q-mb-md br-6 text-semi-bold "
                        style="width: 84px;" label="Cancelar" color="app-danger" v-close-popup />
                    <q-btn no-caps :disable="loadingDelete" class="q-mt-md q-mb-md br-6 text-semi-bold "
                        style="width: 132px;" :loading="loadingDelete" label="Eliminar" color="app-primary"
                        @click="handleDeleteRole()" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { GetRolesUseCase, DeleteRoleUseCase } from '@modules/roles/domain/useCases';
import { useRouter } from 'vue-router';
import type { IRole } from '@modules/roles/infrastructure/interfaces/role.interface';
import dayjs from 'dayjs';
import type { ITablePagination } from 'app/src/common/interfaces';
import { paginationHelper } from 'app/src/common/helpers/pagination-set-helper';
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar';
import { getNotifyDefaultOptions } from 'app/src/common/helpers/notify-default-options.helper';

const props = defineProps({
    admin: {
        type: Boolean,
        default: true,
        required: false,
    },
});


const { t } = useI18n()
const $q = useQuasar();
const $router = useRouter();
const columns: any = [
    { name: 'name', align: 'left', label: 'Nombre', field: 'name', sortable: false },
    { name: 'description', align: 'left', label: 'Descripción', field: 'description', sortable: false },
    {
        name: 'createdAt', align: 'left', label: 'Creado el', sortable: true,
        field: row => row,
        format: val => `${val.createdAt
            ? dayjs.unix(val.createdAt).format('DD-MM-YYYY HH:mm')
            : '-'
            }`
    },
    { name: 'actions', align: 'left', label: 'Acciones' }
];

// REFS
const loading = ref<boolean>(false);
const loadingPagination = ref<boolean>(false);
const loadingDelete = ref<boolean>(false);
const confirmDelete = ref<boolean>(false);
const roles = ref<IRole[]>([]);
const role = ref<IRole | null>(null);
const pagination = ref<ITablePagination>({
    sortBy: null,
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 0,
    offset: 0
});

// FUNCTIONS
const handleGetRoles = async (limit, offset, sort, sortOrder) => {
    roles.value = [];
    loading.value = true;

    const sortOrderFilter = sortOrder ? 'desc' : 'asc';
    const sortFilter = sort ? `&sort[${sort}]=${sortOrderFilter.toUpperCase()}` : '';

    const query = `?pagination[limit]=${limit}&pagination[offset]=${offset < 0 ? 0 : offset
        }${sortFilter}`

    try {
        const response: any = await GetRolesUseCase.handle(query, props.admin);
        roles.value = response.data.data;
        pagination.value.rowsNumber = response.data.pagination.total;
        pagination.value.rowsPerPage = response.data.pagination.limit;
        pagination.value.page = response.data.pagination.currenPage;
        pagination.value.sortBy = sort;
        pagination.value.descending = sortOrder;
        loading.value = false;
    }
    catch (e: any) {
        let errorMessage = t(`APIerrors.${e?.response?.data?.errorCode}`);

        if (errorMessage.includes(e?.response?.data?.errorCode)) {
            errorMessage = e?.response?.data?.errorMessage ?? 'Ha ocurrido un error inesperado.';
        }

        $q.notify({
            ...getNotifyDefaultOptions('error'),
            message: errorMessage
        })
    }
};

function onRequest(paginationProps) {
    const { page, rowsPerPage, rowsNumber, sortBy, descending } =
        paginationProps.pagination;

    loadingPagination.value = true;

    const offset = paginationHelper(
        page,
        pagination.value.page,
        rowsPerPage,
        rowsNumber
    );

    handleGetRoles(
        rowsPerPage,
        offset,
        sortBy,
        descending
    ).then(() => {
        loadingPagination.value = false;
    }).catch(() => {
        loadingPagination.value = false;
    });
}

const editRole = async (roleRow) => {
    await $router.push({ path: `/roles${!props.admin ? '/owners' : ''}/edit/${roleRow.name}` });
};

const deleteRole = (roleRow) => {
    role.value = roleRow;
    confirmDelete.value = true;
};

const handleDeleteRole = async () => {
    loadingDelete.value = true;

    try {
        await DeleteRoleUseCase.handle(role.value.id, props.admin);
        roles.value = roles.value.filter(r => r.id !== role.value.id);
        confirmDelete.value = false;
        $q.notify({
            ...getNotifyDefaultOptions('success'),
            message: 'Rol eliminado exitosamente.'
        })
    }
    catch (e: any) {
        let errorMessage = t(`APIerrors.${e?.response?.data?.errorCode}`);

        if (errorMessage.includes(e?.response?.data?.errorCode)) {
            errorMessage = e?.response?.data?.errorMessage ?? 'Ha ocurrido un error inesperado.';
        }

        $q.notify({
            ...getNotifyDefaultOptions('error'),
            message: errorMessage
        })
    }

    loadingDelete.value = false;
};

// LIFECYCLE HOOKS
onMounted(async () => {
    await handleGetRoles(
        pagination.value.rowsPerPage,
        0,
        pagination.value.sortBy,
        pagination.value.descending);
});

</script>