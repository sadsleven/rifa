<template>
    <div class="full-width">
        <div class="row items-center q-mb-md">
            <span class="fs-20 text-black text-bold q-ml-sm">Top Compradores</span>
        </div>
        <q-table binary-state-sort loading-label="Cargando" :rows="topTenBuyers" :columns="columns" flat
            :loading="loading" style="width: 100%;" :rows-per-page-options="[0]" hide-pagination>

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
import { GetRafflesTopTenUseCase } from '@modules/raffles/domain/useCases';
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar';
import { getNotifyDefaultOptions } from '@common/helpers/notify-default-options.helper';

const props = defineProps({
    raffleId: {
        type: Number,
        required: true,
    }
});

const { t } = useI18n()
const $q = useQuasar();

const columns: any = [
    { name: 'user', align: 'left', label: 'Usuario', field: 'user', sortable: false },
    { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: false },
    { name: 'ticketsPurchased', align: 'left', label: 'Tickets comprados', field: 'ticketsPurchased', sortable: false },
];

// REFS
const loading = ref<boolean>(false);
const topTenBuyers = ref<[]>([]);

// FUNCTIONS
const handleGetTickets = async () => {
    topTenBuyers.value = [];
    loading.value = true;

    try {
        const response: any = await GetRafflesTopTenUseCase.handle(Number(props.raffleId), '');
        topTenBuyers.value = response.data.data;
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


// LIFECYCLE HOOKS
onMounted(async () => {
    if (props.raffleId) {
        await handleGetTickets();
    }
});

</script>
