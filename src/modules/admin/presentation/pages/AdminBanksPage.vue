<template>
    <q-page class="q-pa-lg ">
        <div class="row items-center q-mb-md">
            <q-btn flat round icon="arrow_back" color="black" @click="$router.back()" />
            <span class="fs-20 text-black text-bold q-ml-sm">Administradores de la Banca: {{ $route.params.dbs }}</span>
        </div>
        <q-table binary-state-sort @request="onRequest" v-model:pagination="pagination" loading-label="Cargando"
            :rows="admins" :columns="columns" flat :loading="loading || loadingPagination" row-key="id"
            style="width: 100%;" :rows-per-page-options="[10, 15, 20, 30]"
            :pagination-label="(start, end, total) => `${start}-${end} de ${total}`"
            rows-per-page-label="Admins por página">
        </q-table>
    </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { GetAdminsUseCase } from '@modules/admin/domain/useCases';
import { useRoute } from 'vue-router';
import type { IAdmin } from '@modules/admin/infrastructure/interfaces/admin.interface';
import dayjs from 'dayjs';
import type { ITablePagination } from '@common/interfaces';
import { paginationHelper } from '@common/helpers/pagination-set-helper';
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar';
import { getNotifyDefaultOptions } from '@common/helpers/notify-default-options.helper';

const { t } = useI18n()
const $q = useQuasar();
const $route = useRoute();
const columns: any = [
    { name: 'name', align: 'left', label: 'Nombre', field: 'name', sortable: false },
    {
        name: 'bankDbs', align: 'left', label: 'Banca', sortable: false,
        field: row => row,
        format: val => `${val.bankDbs
            ? val.bankDbs
            : 'No aplica'
            }`
    },
    { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: false },
    { name: 'phone', align: 'left', label: 'Teléfono', field: 'phone', sortable: false },
    {
        name: 'createdAt', align: 'left', label: 'Creado el', sortable: true,
        field: row => row,
        format: val => `${val.createdAt
            ? dayjs.unix(val.createdAt).format('DD-MM-YYYY HH:mm')
            : 'No aplica'
            }`
    },
];

// REFS
const loading = ref<boolean>(false);
const loadingPagination = ref<boolean>(false);
const admins = ref<IAdmin[]>([]);
const pagination = ref<ITablePagination>({
    sortBy: null,
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 0,
    offset: 0
});

// FUNCTIONS
const handleGetAdmins = async (limit, offset, sort, sortOrder) => {
    admins.value = [];
    loading.value = true;

    const sortOrderFilter = sortOrder ? 'desc' : 'asc';
    const sortFilter = sort ? `&sort[${sort}]=${sortOrderFilter.toUpperCase()}` : '';

    const query = `?pagination[limit]=${limit}&pagination[offset]=${offset < 0 ? 0 : offset
        }${sortFilter}&filter[banksDbs][]=${$route.params.dbs}`

    try {
        const response: any = await GetAdminsUseCase.handle(query);
        admins.value = response.data.data;
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

    handleGetAdmins(
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
    await handleGetAdmins(
        pagination.value.rowsPerPage,
        0,
        pagination.value.sortBy,
        pagination.value.descending);
});

</script>
