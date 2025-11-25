<template>
    <div class="full-width column q-pa-lg">
        <div class="row items-center q-mb-md">
            <q-btn flat round icon="arrow_back" color="black" @click="$router.back()" />
            <span class="fs-20 text-black text-bold q-ml-sm">Tickets de la Rifa: {{ raffleId }}</span>
        </div>
        <q-table binary-state-sort @request="onRequest" v-model:pagination="pagination" loading-label="Cargando"
            :rows="tickets" :columns="columns" flat :loading="loading || loadingPagination" row-key="id"
            style="width: 100%;" :rows-per-page-options="[10, 15, 20, 30]"
            :pagination-label="(start, end, total) => `${start}-${end} de ${total}`"
            rows-per-page-label="Tickets por página">

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
import { GetRafflesTicketsUseCase } from '@modules/raffles/domain/useCases';
import { useRoute, useRouter } from 'vue-router';
import type { ITicket } from '@modules/raffles/infrastructure/interfaces/ticket.interface';
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
const raffleId = $route.params.id as string;

const columns: any = [
    { name: 'number', align: 'left', label: 'Número', field: 'number', sortable: false },
    {
        name: 'status', align: 'left', label: 'Estatus', sortable: true,
        field: row => row,
        format: val => `${val.status
            ? t(`ticketStatus.${val.status}`)
            : '-'
            }`
    },
    {
        name: 'buyer', align: 'left', label: 'Comprador', sortable: false,
        field: row => row,
        format: val => `${val.buyer?.name ? val.buyer.name : '-'}`
    },
    {
        name: 'purchaseDate', align: 'left', label: 'Fecha de Compra', sortable: true,
        field: row => row,
        format: val => `${val.purchaseDate
            ? dayjs.unix(val.purchaseDate).format('DD-MM-YYYY HH:mm')
            : '-'
            }`
    },
];

// REFS
const loading = ref<boolean>(false);
const loadingPagination = ref<boolean>(false);
const tickets = ref<ITicket[]>([]);
const pagination = ref<ITablePagination>({
    sortBy: null,
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 0,
    offset: 0
});

// FUNCTIONS
const handleGetTickets = async (limit, offset, sort, sortOrder) => {
    tickets.value = [];
    loading.value = true;

    const sortOrderFilter = sortOrder ? 'desc' : 'asc';
    const sortFilter = sort ? `&sort[${sort}]=${sortOrderFilter.toUpperCase()}` : '';

    const query = `?pagination[limit]=${limit}&pagination[offset]=${offset < 0 ? 0 : offset
        }${sortFilter}`

    try {
        const response: any = await GetRafflesTicketsUseCase.handle(Number(raffleId), query);
        tickets.value = response.data.data;
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

    handleGetTickets(
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
    if (raffleId) {
        await handleGetTickets(
            pagination.value.rowsPerPage,
            0,
            pagination.value.sortBy,
            pagination.value.descending);
    }
});

</script>
