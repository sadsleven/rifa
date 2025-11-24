<template>
    <div class="full-width column q-pa-lg">
        <div class="row items-center q-mb-md">
            <q-btn flat round icon="arrow_back" @click="$router.back()" />
            <span class="fs-20 text-bold q-ml-sm">Usuarios del Banco: {{ dbs }}</span>
        </div>
        <q-table binary-state-sort @request="onRequest" v-model:pagination="pagination" loading-label="Cargando"
            :rows="users" :columns="columns" flat :loading="loading || loadingPagination" row-key="id"
            style="width: 100%;" :rows-per-page-options="[10, 15, 20, 30]"
            :pagination-label="(start, end, total) => `${start}-${end} de ${total}`"
            rows-per-page-label="Usuarios por página">

            <template #no-data="{ icon }">
                <div class="full-width row flex-center text-lv-tertiary q-gutter-sm">
                    <q-icon v-if="!loading" size="2em" :name="icon" />
                    <q-spinner color="app-primary" v-else size="2em" />
                    <span class="text-medium">{{ !loading ? 'No se encontraron resultados.' : 'Cargando' }}</span>
                </div>
            </template>
        </q-table>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { GetUsersUseCase } from '@modules/user/domain/useCases';
import { useRoute, useRouter } from 'vue-router';
import type { IUser } from '@modules/user/infrastructure/interfaces/user.interface';
import dayjs from 'dayjs';
import type { ITablePagination } from 'app/src/common/interfaces';
import { paginationHelper } from 'app/src/common/helpers/pagination-set-helper';
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar';
import { getNotifyDefaultOptions } from 'app/src/common/helpers/notify-default-options.helper';

const { t } = useI18n()
const $q = useQuasar();
const $route = useRoute();
const $router = useRouter();
const dbs = $route.params.dbs as string;

const columns: any = [
    { name: 'name', align: 'left', label: 'Nombre', field: 'name', sortable: false },
    { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: false },
    { name: 'phone', align: 'left', label: 'Teléfono', field: 'phone', sortable: false },
    { name: 'role', align: 'left', label: 'Rol', field: 'role', sortable: false },
    { name: 'status', align: 'left', label: 'Estatus', field: 'status', sortable: false },
    {
        name: 'createdAt', align: 'left', label: 'Creado el', sortable: true,
        field: row => row,
        format: val => `${val.createdAt
            ? dayjs.unix(val.createdAt).format('DD-MM-YYYY HH:mm')
            : '-'
            }`
    },
];

// REFS
const loading = ref<boolean>(false);
const loadingPagination = ref<boolean>(false);
const users = ref<IUser[]>([]);
const pagination = ref<ITablePagination>({
    sortBy: null,
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 0,
    offset: 0
});

// FUNCTIONS
const handleGetUsers = async (limit, offset, sort, sortOrder) => {
    users.value = [];
    loading.value = true;

    const sortOrderFilter = sortOrder ? 'desc' : 'asc';
    const sortFilter = sort ? `&sort[${sort}]=${sortOrderFilter.toUpperCase()}` : '';

    const query = `?pagination[limit]=${limit}&pagination[offset]=${offset < 0 ? 0 : offset
        }${sortFilter}`

    try {
        const response: any = await GetUsersUseCase.handle(dbs, query);
        users.value = response.data.data;
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

    handleGetUsers(
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

// LIFECYCLE HOOKS
onMounted(async () => {
    if (dbs) {
        await handleGetUsers(
            pagination.value.rowsPerPage,
            0,
            pagination.value.sortBy,
            pagination.value.descending);
    }
});

</script>
