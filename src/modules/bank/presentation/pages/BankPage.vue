<template>
    <q-page class="q-pa-lg">
        <q-table binary-state-sort @request="onRequest" v-model:pagination="pagination" loading-label="Cargando"
            :rows="banks" :columns="columns" flat :loading="loading || loadingPagination" row-key="id"
            style="width: 100%;" :rows-per-page-options="[10, 15, 20, 30]"
            :pagination-label="(start, end, total) => `${start}-${end} de ${total}`"
            rows-per-page-label="Bancos por página">
            <!-- CREATE BANK BTN -->
            <template v-slot:top-right>
                <q-btn unelevated :class="{
                    'fs-14 q-mb-md': $q.screen.width < 1065 && $q.screen.width > 800,
                    'full-width': $q.screen.width < 1065,
                }" class="text-medium br-6" no-caps @click="$router.push('/banks/create')" color="app-primary">
                    <q-icon name="add" size="18px" class="q-pr-sm" />
                    Crear banca
                </q-btn>
            </template>

            <!-- ACTIONS COLUMN -->
            <template v-slot:body-cell-enabled="props">
                <q-td :props="props">
                    <q-toggle v-model="props.row.enabled" color="app-primary"
                        @update:model-value="handleEnableOrDisable(props.row)" />
                </q-td>
            </template>

            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn unelevated dense flat round color="app-primary" icon="group"
                        @click="$router.push(`/banks/${props.row.dbs}/users`)">
                        <q-tooltip>Usuarios</q-tooltip>
                    </q-btn>
                    <q-btn unelevated dense flat round color="app-primary" icon="confirmation_number"
                        @click="$router.push(`/banks/${props.row.dbs}/raffles`)">
                        <q-tooltip>Rifas</q-tooltip>
                    </q-btn>
                    <q-btn unelevated dense flat round color="app-primary" icon="edit" @click="editBank(props.row)" />
                    <q-btn unelevated dense flat round color="app-danger" icon="mdi-delete"
                        @click="deleteBank(props.row)" />
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
                    <div class="fs-20 text-semi-bold lh-24 text-center text-black q-mt-md">¿Estas seguro de
                        eliminar el
                        banca: {{
                            `${bank?.name}`
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
                        @click="handleDeleteBank()" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { GetBanksUseCase, DeleteBankUseCase, EnableOrDisableBankUseCase } from '@modules/bank/domain/useCases';
import { useRouter } from 'vue-router';
import type { IBank } from '@modules/bank/infrastructure/interfaces/bank.interface';
import dayjs from 'dayjs';
import type { ITablePagination } from 'app/src/common/interfaces';
import { paginationHelper } from 'app/src/common/helpers/pagination-set-helper';
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar';
import { getNotifyDefaultOptions } from 'app/src/common/helpers/notify-default-options.helper';

const { t } = useI18n()
const $q = useQuasar();
const $router = useRouter();
const columns: any = [
    { name: 'name', align: 'left', label: 'Nombre', field: 'name', sortable: false },
    { name: 'dbs', align: 'left', label: 'DBS', field: 'dbs', sortable: false },
    { name: 'urlEndpoint', align: 'left', label: 'Endpoint', field: 'urlEndpoint', sortable: false },
    {
        name: 'createdAt', align: 'left', label: 'Creado el', sortable: true,
        field: row => row,
        format: val => `${val.createdAt
            ? dayjs.unix(val.createdAt).format('DD-MM-YYYY HH:mm')
            : '-'
            }`
    },
    { name: 'enabled', align: 'left', label: 'Activo', field: 'enabled', sortable: false },
    { name: 'actions', align: 'left', label: 'Acciones' }
];

// REFS
const loading = ref<boolean>(false);
const loadingPagination = ref<boolean>(false);
const loadingDelete = ref<boolean>(false);
const confirmDelete = ref<boolean>(false);
const banks = ref<IBank[]>([]);
const bank = ref<IBank | null>(null);
const pagination = ref<ITablePagination>({
    sortBy: null,
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 0,
    offset: 0
});

// FUNCTIONS
const handleGetBanks = async (limit, offset, sort, sortOrder) => {
    banks.value = [];
    loading.value = true;

    const sortOrderFilter = sortOrder ? 'desc' : 'asc';
    const sortFilter = sort ? `&sort[${sort}]=${sortOrderFilter.toUpperCase()}` : '';

    const query = `?pagination[limit]=${limit}&pagination[offset]=${offset < 0 ? 0 : offset
        }${sortFilter}`

    try {
        const response: any = await GetBanksUseCase.handle(query);
        banks.value = response.data.data;
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

    handleGetBanks(
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

const editBank = async (bankRow) => {
    await $router.push({ path: `/banks/edit/${bankRow.id}` });
};

const deleteBank = (bankRow) => {
    bank.value = bankRow;
    confirmDelete.value = true;
};

const handleDeleteBank = async () => {
    loadingDelete.value = true;

    try {
        await DeleteBankUseCase.handle(bank.value.id);
        banks.value = banks.value.filter(r => r.id !== bank.value.id);
        confirmDelete.value = false;
        $q.notify({
            ...getNotifyDefaultOptions('success'),
            message: 'Banca eliminado exitosamente.'
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

const handleEnableOrDisable = async (row) => {
    try {
        await EnableOrDisableBankUseCase.handle(row.id, row.enabled);
        $q.notify({
            ...getNotifyDefaultOptions('success'),
            message: `Banca ${row.enabled ? 'activado' : 'desactivado'} exitosamente.`
        })
    } catch (e: any) {
        row.enabled = !row.enabled;
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

// LIFECYCLE HOOKS
onMounted(async () => {
    await handleGetBanks(
        pagination.value.rowsPerPage,
        0,
        pagination.value.sortBy,
        pagination.value.descending);
});

</script>
