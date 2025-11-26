<template>
    <div class="wp-100">
        <div v-if="isAdmin" class="row items-center q-mb-md">
            <span class="fs-20 text-bold text-black q-ml-sm">Rifas</span>
        </div>
        <h1 v-else class="fs-25 no-margin">
            Rifas
        </h1>
        <q-table binary-state-sort @request="onRequest" v-model:pagination="pagination" loading-label="Cargando"
            :rows="raffles" :columns="columns" flat :loading="loading || loadingPagination" row-key="id"
            style="width: 100%;" :rows-per-page-options="[10, 15, 20, 30]"
            :pagination-label="(start, end, total) => `${start}-${end} de ${total}`"
            rows-per-page-label="Rifas por página">
            <!-- CREATE RAFFLE BTN -->
            <template v-slot:top-right>
                <q-btn v-if="!isAdmin" unelevated :class="{
                    'fs-14 q-mb-md': $q.screen.width < 1065 && $q.screen.width > 800,
                    'full-width': $q.screen.width < 1065,
                }" class="text-medium br-6" no-caps @click="$router.push(`/raffles/create`)" color="app-primary">
                    <q-icon name="add" size="18px" class="q-pr-sm" />
                    Crear rifa
                </q-btn>
            </template>

            <!-- ACTIONS COLUMN -->
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn unelevated dense flat round color="app-primary" icon="mdi-eye"
                        @click="$router.push(`/raffles/info/${props.row.slug}${isAdmin ? '/' + dbs : ''}`)">
                        <q-tooltip>Ver</q-tooltip>
                    </q-btn>
                    <div v-if="!isAdmin" style="display: inline-block;">
                        <q-btn-dropdown unelevated dense flat rounded color="app-primary" icon="mdi-slot-machine">
                            <q-list>
                                <q-item :disable="props.row.status !== 'published'" clickable v-close-popup
                                    @click="openProcessResultsModal(props.row)">
                                    <q-item-section>
                                        <q-item-label>Procesar Resultados</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item :disable="props.row.status !== 'published'" clickable v-close-popup
                                    @click="openCancelRefundModal(props.row)">
                                    <q-item-section>
                                        <q-item-label>Cancelar y Reembolsar</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-separator />
                                <q-item :disable="props.row.status !== 'draft'" clickable v-close-popup
                                    @click="openPublishDialog(props.row)">
                                    <q-item-section>
                                        <q-item-label>Publicar</q-item-label>
                                    </q-item-section>
                                </q-item>
                                <q-item :disable="props.row.status !== 'toPublish'" clickable v-close-popup
                                    @click="openDraftDialog(props.row)">
                                    <q-item-section>
                                        <q-item-label>Convertir a Borrador</q-item-label>
                                    </q-item-section>
                                </q-item>
                            </q-list>
                        </q-btn-dropdown>
                        <q-tooltip>Opciones de publicación</q-tooltip>
                    </div>
                    <q-btn :disable="props.row.status !== 'draft'" v-if="!isAdmin" unelevated dense flat round
                        color="app-primary" icon="edit" @click="editRaffle(props.row)" />
                    <q-btn v-if="!isAdmin" unelevated dense flat round color="app-danger" icon="mdi-delete"
                        @click="deleteRaffle(props.row)" />
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
                        eliminar la
                        rifa: {{
                            `${raffle?.title}`
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
                        @click="handleDeleteRaffle()" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- PROCESS RESULTS MODAL -->
        <q-dialog v-model="showProcessResultsModal" persistent>
            <q-card style="max-width: 550px; width: 100%;">
                <q-card-section>
                    <div class="fs-20 text-semi-bold text-center text-black">Procesar Resultados</div>
                </q-card-section>

                <q-card-section>
                    <q-input color="app-primary" v-model="processResultsForm.winningTicketNumber"
                        label="Número de Ticket Ganador *" outlined dense :disable="loadingProcessResults" />

                    <div class="q-mt-md">
                        <div class="text-semi-bold q-mb-sm">Seleccionar Lugares *</div>
                        <q-spinner v-if="loadingPlaces" color="app-primary" size="2em" />
                        <div v-else-if="raffleDetails?.places && raffleDetails.places.length > 0">
                            <q-checkbox v-for="place in raffleDetails.places" :key="place.id"
                                v-model="processResultsForm.selectedPlaces" :val="place.id"
                                :label="`Lugar ${place.place}: ${place.description}`" />
                        </div>
                        <div v-else class="text-grey">No hay lugares disponibles</div>
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn class="br-8 py-10 " color="black" no-caps flat label="Cancelar" v-close-popup
                        :disable="loadingProcessResults" />
                    <q-btn class="br-8 py-10 " no-caps unelevated label="Procesar" color="app-primary"
                        @click="handleProcessResults" :loading="loadingProcessResults"
                        :disable="!isProcessResultsFormValid" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- CANCEL AND REFUND MODAL -->
        <q-dialog v-model="showCancelRefundModal" persistent>
            <q-card style="max-width: 550px; width: 100%;">
                <q-card-section>
                    <div class="fs-20 text-semi-bold text-center text-black">Cancelar y Reembolsar</div>
                </q-card-section>

                <q-card-section>
                    <q-banner class="bg-warning text-white q-mb-md">
                        <template v-slot:avatar>
                            <q-icon name="warning" color="white" />
                        </template>
                        Esta acción cancelará la rifa y reembolsará a todos los participantes.
                    </q-banner>

                    <q-input color="app-primary" v-model="cancelRefundForm.winningTicketNumber"
                        label="Número de Ticket Ganador *" outlined dense :disable="loadingCancelRefund" />

                    <div class="q-mt-md">
                        <div class="text-semi-bold q-mb-sm">Seleccionar Lugares *</div>
                        <q-spinner v-if="loadingPlaces" color="app-primary" size="2em" />
                        <div v-else-if="raffleDetails?.places && raffleDetails.places.length > 0">
                            <q-checkbox v-for="place in raffleDetails.places" :key="place.id"
                                v-model="cancelRefundForm.selectedPlaces" :val="place.id"
                                :label="`Lugar ${place.place}: ${place.description}`" />
                        </div>
                        <div v-else class="text-grey">No hay lugares disponibles</div>
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn class="br-8 py-10 " color="black" no-caps flat label="Cancelar" v-close-popup
                        :disable="loadingCancelRefund" />
                    <q-btn class="br-8 py-10 " no-caps unelevated label="Confirmar" color="app-primary"
                        @click="handleCancelRefund" :loading="loadingCancelRefund"
                        :disable="!isCancelRefundFormValid" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- PUBLISH CONFIRMATION DIALOG -->
        <q-dialog v-model="showPublishDialog" persistent>
            <q-card style="max-width: 450px; width: 100%;">
                <q-card-section class="row items-center justify-center">
                    <div class="fs-20 text-semi-bold lh-24 text-center text-black q-mt-md">
                        ¿Estás seguro de publicar la rifa: {{ raffle?.title }}?
                    </div>
                </q-card-section>

                <q-card-section class="row items-center justify-center no-padding">
                    <q-icon name="publish" color="app-primary" size="70px" />
                </q-card-section>

                <q-card-actions align="center">
                    <q-btn no-caps :disable="loadingPublish" class="q-mt-md q-mb-md br-6 text-semi-bold"
                        style="width: 84px;" label="Cancelar" color="app-danger" v-close-popup />
                    <q-btn no-caps :disable="loadingPublish" class="q-mt-md q-mb-md br-6 text-semi-bold"
                        style="width: 132px;" :loading="loadingPublish" label="Publicar" color="app-primary"
                        @click="handlePublish" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- DRAFT CONFIRMATION DIALOG -->
        <q-dialog v-model="showDraftDialog" persistent>
            <q-card style="max-width: 450px; width: 100%;">
                <q-card-section class="row items-center justify-center">
                    <div class="fs-20 text-semi-bold lh-24 text-center text-black q-mt-md">
                        ¿Estás seguro de convertir a borrador la rifa: {{ raffle?.title }}?
                    </div>
                </q-card-section>

                <q-card-section class="row items-center justify-center no-padding">
                    <q-icon name="drafts" color="app-primary" size="70px" />
                </q-card-section>

                <q-card-actions align="center">
                    <q-btn no-caps :disable="loadingDraft" class="q-mt-md q-mb-md br-6 text-semi-bold"
                        style="width: 84px;" label="Cancelar" color="app-danger" v-close-popup />
                    <q-btn no-caps :disable="loadingDraft" class="q-mt-md q-mb-md br-6 text-semi-bold"
                        style="width: 132px;" :loading="loadingDraft" label="Confirmar" color="app-primary"
                        @click="handleDraft" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import {
    GetRafflesUseCase,
    DeleteRaffleUseCase,
    GetOwnerRafflesUseCase,
    GetRaffleBySlugUseCase,
    ProcessResultsUseCase,
    CancelAndRefundUseCase,
    ToPublishUseCase,
    ToDraftUseCase
} from '@modules/raffles/domain/useCases';
import { useRouter } from 'vue-router';
import type { IRaffle } from '@modules/raffles/infrastructure/interfaces/raffle.interface';
import dayjs from 'dayjs';
import type { ITablePagination } from 'app/src/common/interfaces';
import { paginationHelper } from 'app/src/common/helpers/pagination-set-helper';
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar';
import { getNotifyDefaultOptions } from 'app/src/common/helpers/notify-default-options.helper';
import { useAuthStore } from 'app/src/modules/auth/domain/store';

const props = defineProps({
    dbs: {
        type: String,
        required: false,
    }
});

const { t } = useI18n()
const $q = useQuasar();
const $router = useRouter();
const authStore = useAuthStore();
const dbs = props.dbs ?? authStore.GetUser?.bankDbs ?? '';
const isAdmin = props.dbs?.length

const columns: any = [
    { name: 'title', align: 'left', label: 'Título', field: 'title', sortable: false },
    {
        name: 'status', align: 'left', label: 'Estatus', sortable: true,
        field: row => row,
        format: val => `${val.status
            ? t(`raffleStatus.${val.status}`)
            : '-'
            }`
    },
    { name: 'ticketPrice', align: 'left', label: 'Precio', field: 'ticketPrice', sortable: false },
    { name: 'ticketAvailable', align: 'left', label: 'Tickets disponibles', field: 'ticketAvailable', sortable: false },
    {
        name: 'startDate', align: 'left', label: 'Inicio', sortable: true,
        field: row => row,
        format: val => `${val.startDate
            ? dayjs.unix(val.startDate).format('DD-MM-YYYY HH:mm')
            : '-'
            }`
    },
    {
        name: 'endDate', align: 'left', label: 'Fin', sortable: true,
        field: row => row,
        format: val => `${val.endDate
            ? dayjs.unix(val.endDate).format('DD-MM-YYYY HH:mm')
            : '-'
            }`
    },
    {
        name: 'createdAt', align: 'left', label: 'Creado el', sortable: true,
        field: row => row,
        format: val => `${val.createdAt
            ? dayjs.unix(val.createdAt).format('DD-MM-YYYY HH:mm')
            : 'No aplica'
            }`
    },
    { name: 'actions', align: 'left', label: 'Acciones' }
];

// REFS
const loading = ref<boolean>(false);
const loadingPagination = ref<boolean>(false);
const loadingDelete = ref<boolean>(false);
const confirmDelete = ref<boolean>(false);
const raffles = ref<IRaffle[]>([]);
const raffle = ref<IRaffle | null>(null);
const pagination = ref<ITablePagination>({
    sortBy: null,
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 0,
    offset: 0
});

// NEW RAFFLE MANAGEMENT REFS
const showProcessResultsModal = ref<boolean>(false);
const showCancelRefundModal = ref<boolean>(false);
const showPublishDialog = ref<boolean>(false);
const showDraftDialog = ref<boolean>(false);
const loadingProcessResults = ref<boolean>(false);
const loadingCancelRefund = ref<boolean>(false);
const loadingPublish = ref<boolean>(false);
const loadingDraft = ref<boolean>(false);
const loadingPlaces = ref<boolean>(false);
const raffleDetails = ref<IRaffle | null>(null);
const processResultsForm = ref<{ winningTicketNumber: string; selectedPlaces: number[] }>({
    winningTicketNumber: '',
    selectedPlaces: []
});
const cancelRefundForm = ref<{ winningTicketNumber: string; selectedPlaces: number[] }>({
    winningTicketNumber: '',
    selectedPlaces: []
});

// COMPUTED
const isProcessResultsFormValid = computed(() => {
    return processResultsForm.value.winningTicketNumber.trim() !== '' &&
        processResultsForm.value.selectedPlaces.length > 0;
});

const isCancelRefundFormValid = computed(() => {
    return cancelRefundForm.value.winningTicketNumber.trim() !== '' &&
        cancelRefundForm.value.selectedPlaces.length > 0;
});

// FUNCTIONS
const handleGetRaffles = async (limit, offset, sort, sortOrder) => {
    raffles.value = [];
    loading.value = true;

    const sortOrderFilter = sortOrder ? 'desc' : 'asc';
    const sortFilter = sort ? `&sort[${sort}]=${sortOrderFilter.toUpperCase()}` : '';

    const query = `?pagination[limit]=${limit}&pagination[offset]=${offset < 0 ? 0 : offset
        }${sortFilter}`

    try {
        const response: any = isAdmin ? await GetRafflesUseCase.handle(dbs, query) : await GetOwnerRafflesUseCase.handle(query);
        raffles.value = response.data.data;
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

    handleGetRaffles(
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

const editRaffle = async (raffleRow) => {
    await $router.push({ path: `/raffles/edit/${raffleRow.slug}` });
};

const deleteRaffle = (raffleRow) => {
    raffle.value = raffleRow;
    confirmDelete.value = true;
};

const handleDeleteRaffle = async () => {
    loadingDelete.value = true;

    try {
        await DeleteRaffleUseCase.handle(raffle.value.id);
        raffles.value = raffles.value.filter(r => r.id !== raffle.value.id);
        confirmDelete.value = false;
        $q.notify({
            ...getNotifyDefaultOptions('success'),
            message: 'Rifa eliminada exitosamente.'
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

// NEW RAFFLE MANAGEMENT FUNCTIONS
const fetchRaffleDetails = async (slug: string) => {
    loadingPlaces.value = true;
    try {
        const response: any = await GetRaffleBySlugUseCase.handle(slug);
        raffleDetails.value = response.data.data;
    } catch (e: any) {
        let errorMessage = t(`APIerrors.${e?.response?.data?.errorCode}`);
        if (errorMessage.includes(e?.response?.data?.errorCode)) {
            errorMessage = e?.response?.data?.errorMessage ?? 'Error al obtener detalles de la rifa.';
        }
        $q.notify({
            ...getNotifyDefaultOptions('error'),
            message: errorMessage
        });
    } finally {
        loadingPlaces.value = false;
    }
};

const openProcessResultsModal = async (raffleRow: IRaffle) => {
    raffle.value = raffleRow;
    processResultsForm.value = { winningTicketNumber: '', selectedPlaces: [] };
    raffleDetails.value = null;
    showProcessResultsModal.value = true;
    await fetchRaffleDetails(raffleRow.slug);
};

const openCancelRefundModal = async (raffleRow: IRaffle) => {
    raffle.value = raffleRow;
    cancelRefundForm.value = { winningTicketNumber: '', selectedPlaces: [] };
    raffleDetails.value = null;
    showCancelRefundModal.value = true;
    await fetchRaffleDetails(raffleRow.slug);
};

const openPublishDialog = (raffleRow: IRaffle) => {
    raffle.value = raffleRow;
    showPublishDialog.value = true;
};

const openDraftDialog = (raffleRow: IRaffle) => {
    raffle.value = raffleRow;
    showDraftDialog.value = true;
};

const handleProcessResults = async () => {
    if (!raffle.value || !isProcessResultsFormValid.value) return;

    loadingProcessResults.value = true;
    try {
        await ProcessResultsUseCase.handle(raffle.value.id, {
            winningTicketNumber: processResultsForm.value.winningTicketNumber,
            placeIds: processResultsForm.value.selectedPlaces
        });
        showProcessResultsModal.value = false;
        $q.notify({
            ...getNotifyDefaultOptions('success'),
            message: 'Resultados procesados exitosamente.'
        });
        // Refresh the raffles list
        await handleGetRaffles(
            pagination.value.rowsPerPage,
            pagination.value.offset,
            pagination.value.sortBy,
            pagination.value.descending
        );
    } catch (e: any) {
        let errorMessage = t(`APIerrors.${e?.response?.data?.errorCode}`);
        if (errorMessage.includes(e?.response?.data?.errorCode)) {
            errorMessage = e?.response?.data?.errorMessage ?? 'Error al procesar resultados.';
        }
        $q.notify({
            ...getNotifyDefaultOptions('error'),
            message: errorMessage
        });
    } finally {
        loadingProcessResults.value = false;
    }
};

const handleCancelRefund = async () => {
    if (!raffle.value || !isCancelRefundFormValid.value) return;

    loadingCancelRefund.value = true;
    try {
        await CancelAndRefundUseCase.handle(raffle.value.id, {
            winningTicketNumber: cancelRefundForm.value.winningTicketNumber,
            placeIds: cancelRefundForm.value.selectedPlaces
        });
        showCancelRefundModal.value = false;
        $q.notify({
            ...getNotifyDefaultOptions('success'),
            message: 'Rifa cancelada y reembolsos procesados exitosamente.'
        });
        // Refresh the raffles list
        await handleGetRaffles(
            pagination.value.rowsPerPage,
            pagination.value.offset,
            pagination.value.sortBy,
            pagination.value.descending
        );
    } catch (e: any) {
        let errorMessage = t(`APIerrors.${e?.response?.data?.errorCode}`);
        if (errorMessage.includes(e?.response?.data?.errorCode)) {
            errorMessage = e?.response?.data?.errorMessage ?? 'Error al cancelar y reembolsar.';
        }
        $q.notify({
            ...getNotifyDefaultOptions('error'),
            message: errorMessage
        });
    } finally {
        loadingCancelRefund.value = false;
    }
};

const handlePublish = async () => {
    if (!raffle.value) return;

    loadingPublish.value = true;
    try {
        await ToPublishUseCase.handle(raffle.value.id);
        showPublishDialog.value = false;
        $q.notify({
            ...getNotifyDefaultOptions('success'),
            message: 'Rifa publicada exitosamente.'
        });
        // Refresh the raffles list
        await handleGetRaffles(
            pagination.value.rowsPerPage,
            pagination.value.offset,
            pagination.value.sortBy,
            pagination.value.descending
        );
    } catch (e: any) {
        let errorMessage = t(`APIerrors.${e?.response?.data?.errorCode}`);
        if (errorMessage.includes(e?.response?.data?.errorCode)) {
            errorMessage = e?.response?.data?.errorMessage ?? 'Error al publicar la rifa.';
        }
        $q.notify({
            ...getNotifyDefaultOptions('error'),
            message: errorMessage
        });
    } finally {
        loadingPublish.value = false;
    }
};

const handleDraft = async () => {
    if (!raffle.value) return;

    loadingDraft.value = true;
    try {
        await ToDraftUseCase.handle(raffle.value.id);
        showDraftDialog.value = false;
        $q.notify({
            ...getNotifyDefaultOptions('success'),
            message: 'Rifa convertida a borrador exitosamente.'
        });
        // Refresh the raffles list
        await handleGetRaffles(
            pagination.value.rowsPerPage,
            pagination.value.offset,
            pagination.value.sortBy,
            pagination.value.descending
        );
    } catch (e: any) {
        let errorMessage = t(`APIerrors.${e?.response?.data?.errorCode}`);
        if (errorMessage.includes(e?.response?.data?.errorCode)) {
            errorMessage = e?.response?.data?.errorMessage ?? 'Error al convertir a borrador.';
        }
        $q.notify({
            ...getNotifyDefaultOptions('error'),
            message: errorMessage
        });
    } finally {
        loadingDraft.value = false;
    }
};

// LIFECYCLE HOOKS
onMounted(async () => {
    if (dbs) {
        await handleGetRaffles(
            pagination.value.rowsPerPage,
            0,
            pagination.value.sortBy,
            pagination.value.descending);
    }
});

</script>
