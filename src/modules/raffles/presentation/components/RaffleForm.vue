<template>
  <div>
    <q-form class="self-end flex column wp-100" ref="formRef" greedy @submit="handleUploadRaffle">
      <div class="row">
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Título' }}
          </span>
          <q-input :disable="loading || loadingRaffle" outlined color="app-primary" v-model.trim="formRaffle.title"
            type="text" ref="titleInp" placeholder="Título" class="mt-4" :rules="[
              val => !!val || 'El título es requerido'
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Descripción' }}
          </span>
          <q-input :disable="loading || loadingRaffle" outlined color="app-primary"
            v-model.trim="formRaffle.description" type="text" ref="descriptionInp" placeholder="Descripción"
            class="mt-4" :rules="[
              val => !!val || 'La descripción es requerida'
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'URL Imagen Principal' }}
          </span>
          <q-input :disable="loading || loadingRaffle" outlined color="app-primary" v-model.trim="formRaffle.mainImgUrl"
            type="text" ref="mainImgUrlInp" placeholder="URL Imagen Principal" class="mt-4" :rules="[
              val => !!val || 'La URL de la imagen principal es requerida',
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <div class="row items-center justify-between">
            <span class="fs-14 text-black">{{ 'Imágenes Adicionales' }}</span>
            <q-btn round dense flat color="primary" icon="add" size="sm" @click="addImgUrl" />
          </div>
          <div v-for="(url, index) in formRaffle.imgUrls" :key="index" class="row items-center q-mt-xs">
            <q-input dense outlined v-model.trim="formRaffle.imgUrls[index]" placeholder="URL" class="col" />
            <q-btn round dense flat color="negative" icon="delete" size="sm" @click="removeImgUrl(index)" />
          </div>
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Fecha de Inicio' }}
          </span>
          <q-input :disable="loading || loadingRaffle" outlined color="app-primary" v-model="formRaffle.startDate"
            type="datetime-local" ref="startDateInp" class="mt-4" :rules="[
              val => !!val || 'La fecha de inicio es requerida'
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Fecha de Fin' }}
          </span>
          <q-input :disable="loading || loadingRaffle" outlined color="app-primary" v-model="formRaffle.endDate"
            type="datetime-local" ref="endDateInp" class="mt-4" :rules="[
              val => !!val || 'La fecha de fin es requerida'
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Dígitos del Ticket' }}
          </span>
          <q-input :disable="loading || loadingRaffle" outlined color="app-primary"
            v-model.number="formRaffle.ticketDigits" type="number" ref="ticketDigitsInp" placeholder="Ej: 3"
            class="mt-4" :rules="[
              val => !!val || 'Los dígitos del ticket son requeridos'
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Precio del Ticket' }}
          </span>
          <q-input :disable="loading || loadingRaffle" outlined color="app-primary"
            v-model.number="formRaffle.ticketPrice" type="number" step="0.01" ref="ticketPriceInp" placeholder="Precio"
            class="mt-4" :rules="[
              val => !!val || 'El precio del ticket es requerido'
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Moneda' }}
          </span>
          <q-input :disable="loading || loadingRaffle" outlined color="app-primary" v-model.trim="formRaffle.currency"
            type="text" ref="currencyInp" placeholder="Ej: VES" class="mt-4" :rules="[
              val => !!val || 'La moneda es requerida'
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Tipo de Asignación' }}
          </span>
          <q-select :disable="loading || loadingRaffle" outlined color="app-primary" v-model="formRaffle.assignmentType"
            :options="['increment', 'random']" label="Tipo de Asignación" class="mt-4" />
        </div>
      </div>

      <!-- PLACES SECTION -->
      <div class="row q-mt-md">
        <div class="col-12 q-pa-md">
          <div class="row items-center justify-between">
            <span class="fs-16 text-bold text-black">Lugares (Premios)</span>
            <q-btn round dense flat color="primary" icon="add" @click="addPlace" />
          </div>
          <div v-for="(place, index) in formRaffle.places" :key="index" class="q-pa-sm q-mb-sm bg-grey-2 br-8">
            <div class="row items-center justify-between">
              <span class="text-bold">Lugar #{{ place.place }}</span>
              <q-btn round dense flat color="negative" icon="delete" @click="removePlace(index)" />
            </div>
            <div class="row">
              <div class="col-12 col-md-6 q-pa-xs">
                <q-select dense outlined v-model="place.rewardsYes"
                  :options="['exactNumber', 'upperApproximation', 'lowerApproximation', 'terminal']"
                  label="Tipo de Premio" />
              </div>
              <div class="col-12 col-md-6 q-pa-xs">
                <q-input dense outlined v-model="place.description" label="Descripción" />
              </div>
            </div>
            <!-- Rewards inside Place -->
            <div class="q-pl-md q-mt-sm">
              <div class="row items-center justify-between">
                <span class="text-caption text-bold">Recompensas</span>
                <q-btn round dense flat size="sm" color="primary" icon="add" @click="addReward(index)" />
              </div>
              <div v-for="(reward, rIndex) in place.rewards" :key="rIndex" class="row q-mb-xs">
                <div class="col-5 q-pa-xs">
                  <q-input dense outlined v-model="reward.name" label="Nombre" />
                </div>
                <div class="col-6 q-pa-xs">
                  <q-input dense outlined v-model="reward.description" label="Desc" />
                </div>
                <div class="col-1 q-pa-xs flex flex-center">
                  <q-btn round dense flat size="sm" color="negative" icon="delete"
                    @click="removeReward(index, rIndex)" />
                </div>
              </div>
            </div>
          </div>
          <div v-if="formRaffle.places.length === 0" class="text-negative text-caption">
            Debe agregar al menos un lugar.
          </div>
        </div>
      </div>

      <!-- QUICK PURCHASES SECTION -->
      <div class="row q-mt-md">
        <div class="col-12 q-pa-md">
          <div class="row items-center justify-between">
            <span class="fs-16 text-bold text-black">Compras Rápidas (Min 6)</span>
            <q-btn round dense flat color="primary" icon="add" @click="addQuickPurchase" />
          </div>
          <div class="row">
            <div v-for="(qp, index) in formRaffle.quickPurchases" :key="index" class="col-12 col-md-4 q-pa-sm">
              <div class="row items-center q-gutter-x-sm bg-grey-2 q-pa-sm br-8">
                <q-input dense outlined v-model.number="qp.minTickets" type="number" label="Min Tickets" class="col" />
                <q-input dense outlined v-model.number="qp.discountPercentage" type="number" label="% Desc"
                  class="col" />
                <q-btn round dense flat color="negative" icon="delete" @click="removeQuickPurchase(index)" />
              </div>
            </div>
          </div>
          <div v-if="formRaffle.quickPurchases.length < 6" class="text-negative text-caption">
            Debe agregar al menos 6 opciones de compra rápida.
          </div>
        </div>
      </div>

      <div class="full-width flex justify-between q-mt-lg">
        <q-btn :disable="loading || loadingRaffle" no-caps unelevated flat color="black" class="py-14 text-white br-8"
          @click="$router.back()">
          <span>
            {{ 'Cancelar' }}
          </span>
        </q-btn>
        <q-btn no-caps unelevated :disable="loading || loadingRaffle" :loading="loading" color="app-primary"
          class="py-14 text-white br-8" type="submit">
          <span>
            {{ `${!isUpdate ? 'Registrar' : 'Editar'} rifa` }}
          </span>
        </q-btn>
      </div>

    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { QForm, useQuasar } from 'quasar';
import { CreateRaffleUseCase, EditRaffleUseCase } from '@modules/raffles/domain/useCases';
import { useRouter, useRoute } from 'vue-router';
import type { IRaffle, IRafflePlace, IRaffleQuickPurchase } from '@modules/raffles/infrastructure/interfaces/raffle.interface';
import { getNotifyDefaultOptions } from 'app/src/common/helpers/notify-default-options.helper';
import { useI18n } from 'vue-i18n';

// CONSTANTS
const { t } = useI18n()
const $q = useQuasar();
const $router = useRouter();
const $route = useRoute();
const dbs = $route.params.dbs as string;

// REFS
const formRef = ref<QForm | null>(null);
const loading = ref<boolean>(false);
const raffle = ref<IRaffle | null>(null);
const loadingRaffle = ref<boolean>(false);

// REACTIVE
const formRaffle = reactive({
  title: '',
  description: '',
  mainImgUrl: '',
  imgUrls: [] as string[],
  startDate: '',
  endDate: '',
  ticketDigits: 3,
  ticketPrice: 0,
  currency: 'VES',
  assignmentType: 'increment',
  places: [] as any[],
  quickPurchases: [] as IRaffleQuickPurchase[]
});

const props = defineProps({
  isUpdate: {
    type: Boolean,
    default: false,
    required: false,
  },
  raffleId: {
    type: Number,
    required: false,
  }
});

// HELPER FUNCTIONS
const addPlace = () => {
  formRaffle.places.push({
    place: formRaffle.places.length + 1,
    rewardsYes: 'exactNumber',
    description: '',
    rewards: [],
    imgUrls: []
  });
};

const removePlace = (index: number) => {
  formRaffle.places.splice(index, 1);
  // Re-index places
  formRaffle.places.forEach((p, i) => p.place = i + 1);
};

const addReward = (placeIndex: number) => {
  formRaffle.places[placeIndex].rewards.push({
    name: '',
    description: '',
    imgUrls: []
  });
};

const removeReward = (placeIndex: number, rewardIndex: number) => {
  formRaffle.places[placeIndex].rewards.splice(rewardIndex, 1);
};

const addQuickPurchase = () => {
  formRaffle.quickPurchases.push({
    minTickets: 0,
    discountPercentage: 0
  });
};

const removeQuickPurchase = (index: number) => {
  formRaffle.quickPurchases.splice(index, 1);
};

const addImgUrl = () => {
  formRaffle.imgUrls.push('');
};

const removeImgUrl = (index: number) => {
  formRaffle.imgUrls.splice(index, 1);
};

// FUNCTIONS
const handleUploadRaffle = async () => {
  // Custom validation
  if (formRaffle.places.length === 0) {
    $q.notify({ ...getNotifyDefaultOptions('error'), message: 'Debe agregar al menos un lugar.' });
    return;
  }
  if (formRaffle.quickPurchases.length < 6) {
    $q.notify({ ...getNotifyDefaultOptions('error'), message: 'Debe agregar al menos 6 opciones de compra rápida.' });
    return;
  }

  loading.value = true;

  await formRef.value?.validate();

  if (!props.isUpdate) {
    try {
      await CreateRaffleUseCase.handle(dbs, formRaffle);
      $q.notify({
        ...getNotifyDefaultOptions('success'),
        message: 'Rifa creada exitosamente.'
      })
      await $router.push(`/banks/${dbs}/raffles`);
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
  }
  else {
    if (!props.raffleId) return;
    try {
      await EditRaffleUseCase.handle(dbs, formRaffle, props.raffleId);
      $q.notify({
        ...getNotifyDefaultOptions('success'),
        message: 'Rifa editada exitosamente.'
      })
      await $router.push(`/banks/${dbs}/raffles`);
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
  }

  loading.value = false;
};

// LIFECYCLE HOOKS
onMounted(async () => {
  if (!props.isUpdate) {
    // Pre-fill quick purchases with some defaults if creating new
    if (formRaffle.quickPurchases.length === 0) {
      const defaults = [
        { minTickets: 5, discountPercentage: 0 },
        { minTickets: 10, discountPercentage: 0 },
        { minTickets: 20, discountPercentage: 0 },
        { minTickets: 50, discountPercentage: 5 },
        { minTickets: 100, discountPercentage: 10 },
        { minTickets: 200, discountPercentage: 15 },
      ];
      formRaffle.quickPurchases.push(...defaults);
    }
    // Pre-fill one place
    addPlace();
  }
  if (props.isUpdate) {
    // await handleGetRaffle();
  }
});

</script>
