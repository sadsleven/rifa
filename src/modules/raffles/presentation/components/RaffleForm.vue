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
              validate('title')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Descripción' }}
          </span>
          <q-input :disable="loading || loadingRaffle" outlined color="app-primary"
            v-model.trim="formRaffle.description" type="text" ref="descriptionInp" placeholder="Descripción"
            class="mt-4" :rules="[
              validate('description')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'URL Imagen Principal' }}
          </span>
          <q-input :disable="loading || loadingRaffle" outlined color="app-primary" v-model.trim="formRaffle.mainImgUrl"
            type="text" ref="mainImgUrlInp" placeholder="URL Imagen Principal" class="mt-4" :rules="[
              validate('mainImgUrl')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <div class="row items-center justify-start">
            <span class="fs-14 text-black">{{ 'Imágenes Adicionales' }}</span>
            <q-btn class="ml-4" round dense flat color="primary" icon="add" size="md" @click="addImgUrl" />
          </div>
          <div v-for="(url, index) in formRaffle.imgUrls" :key="index" class="row items-center q-mt-xs">
            <q-input dense outlined v-model.trim="formRaffle.imgUrls[index]" placeholder="URL" class="col" />
            <q-btn round dense flat color="negative" icon="delete" size="md" @click="removeImgUrl(index)" />
          </div>
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Fecha inicio' }}
          </span>
          <q-input readonly :disable="loading || loadingRaffle" color="app-primary" outlined
            v-model="formRaffle.startDate" placeholder="DD/MM/AAAA" mask="##/##/####" :rules="[validate('startDate')]">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date mask="DD/MM/YYYY" color="app-primary" v-model="formRaffle.startDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Cerrar" color="app-primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Hora inicio' }}
          </span>

          <q-input :disable="loading || loadingRaffle" readonly outlined v-model="formRaffle.startTime" mask="time"
            :rules="[validate('startDate')]">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time color="app-primary" v-model="formRaffle.startTime">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Cerrar" color="app-primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Fecha fin' }}
          </span>
          <q-input readonly :disable="loading || loadingRaffle" color="app-primary" outlined
            v-model="formRaffle.endDate" placeholder="DD/MM/AAAA" mask="##/##/####" :rules="[validate('endDate')]">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date mask="DD/MM/YYYY" color="app-primary" v-model="formRaffle.endDate">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Cerrar" color="app-primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Hora fin' }}
          </span>

          <q-input :disable="loading || loadingRaffle" readonly outlined v-model="formRaffle.endTime" mask="time"
            :rules="[validate('endDate')]">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time color="app-primary" v-model="formRaffle.endTime">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Cerrar" color="app-primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Dígitos del Ticket' }}
          </span>
          <q-input :disable="loading || loadingRaffle" outlined color="app-primary"
            v-model.number="formRaffle.ticketDigits" type="number" ref="ticketDigitsInp" placeholder="Ej: 3"
            class="mt-4" :rules="[
              validate('ticketDigits')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Precio del Ticket' }}
          </span>
          <q-input :disable="loading || loadingRaffle" outlined color="app-primary"
            v-model.number="formRaffle.ticketPrice" type="number" step="0.01" ref="ticketPriceInp" placeholder="Precio"
            class="mt-4" :rules="[
              validate('ticketPrice')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Moneda' }}
          </span>
          <q-input :disable="loading || loadingRaffle" outlined color="app-primary" v-model.trim="formRaffle.currency"
            type="text" ref="currencyInp" placeholder="Ej: VES" class="mt-4" :rules="[
              validate('currency')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Tipo de Asignación' }}
          </span>
          <q-select :disable="loading || loadingRaffle" outlined color="app-primary" v-model="formRaffle.assignmentType"
            :options="assignmentOptions" class="mt-4">
            <template #selected-item="{ opt }">
              {{assignmentOptions.find(ro => ro.value === opt)?.label}}
            </template>
          </q-select>
        </div>
      </div>

      <!-- PLACES SECTION -->
      <div class="row q-mt-md">
        <div class="col-12 q-pa-md">
          <div class="row items-center justify-between">
            <span class="fs-16 text-bold text-black">Lugares (Premios)</span>
            <q-btn round dense flat color="primary" icon="add" @click="addPlace" />
          </div>
          <div v-for="(place, index) in formRaffle.places" :key="index" class="q-pa-sm q-mb-sm bg-grey-1 br-8">
            <div class="row items-center justify-between">
              <span class="pl-5 fs-12 text-caption text-semi-bold  text-black">Lugar #{{ place.place }}</span>
              <q-btn round dense flat color="negative" icon="delete" @click="removePlace(index)" />
            </div>
            <div class="row">
              <div class="col-12 col-md-6 q-pa-xs">
                <q-select color="app-primary" dense emit-value outlined v-model="place.rewardsYes"
                  :options="rewardOption" label="Tipo de Premio" :rules="[validatePlace('rewardsYes')]">
                  <template #selected-item="{ opt }">
                    {{rewardOption.find(ro => ro.value === opt)?.label}}
                  </template>
                </q-select>
              </div>
              <div class="col-12 col-md-6 q-pa-xs">
                <q-select color="app-primary" dense outlined v-model="place.type" :options="placeOptions" label="Tipo"
                  :rules="[validatePlace('type')]">
                  <template #selected-item="{ opt }">
                    {{placeOptions.find(ro => ro.value === opt)?.label}}
                  </template>
                </q-select>
              </div>
              <div class="col-12 col-md-6 q-pa-xs">
                <q-input color="app-primary" dense outlined v-model.number="place.amount" type="number" label="Cantidad"
                  :rules="[validatePlace('amount')]" />
              </div>
              <div class="col-12 col-md-6 q-pa-xs">
                <q-input color="app-primary" dense outlined v-model="place.description" label="Descripción"
                  :rules="[validatePlace('description')]" />
              </div>
              <div class="col-12 col-md-6 q-pa-xs">
                <q-input label="Fecha Sorteo" readonly dense :disable="loading || loadingRaffle" color="app-primary"
                  outlined v-model="place.lotteryAt" placeholder="DD/MM/AAAA" mask="##/##/####"
                  :rules="[validatePlace('lotteryAt')]">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-date mask="DD/MM/YYYY" color="app-primary" v-model="place.lotteryAt">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Cerrar" color="app-primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-12 col-md-6 q-pa-xs">
                <q-input label="Hora Sorteo" readonly dense :disable="loading || loadingRaffle" outlined
                  v-model="place.lotteryTime" mask="time" :rules="[validatePlace('lotteryAt')]">
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time color="app-primary" v-model="place.lotteryTime">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Cerrar" color="app-primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>

            <!-- ImgUrls inside Place -->
            <div class=" q-mt-sm">
              <div class="row items-center justify-start">
                <span class="pl-5 fs-12 text-caption text-semi-bold text-black">Imágenes del Premio (Min 1)</span>
                <q-btn round dense flat size="md" class="ml-4" color="primary" icon="add"
                  @click="addPlaceImgUrl(index)" />
              </div>
              <div v-for="(url, uIndex) in place.imgUrls" :key="uIndex" class="row q-mb-xs items-center">
                <div class="col-11 q-pa-xs">
                  <q-input dense outlined v-model="place.imgUrls[uIndex]" label="URL Imagen" />
                </div>
                <div class="col-1 flex flex-center">
                  <q-btn round dense flat size="md" color="negative" icon="delete"
                    @click="removePlaceImgUrl(index, uIndex)" />
                </div>
              </div>
              <div v-if="place.imgUrls.length === 0" class="text-negative text-caption">
                Debe agregar al menos una imagen para el premio.
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
              <div class="row items-center q-gutter-x-sm bg-grey-1 q-pa-sm br-8">
                <q-input hide-bottom-space dense outlined v-model.number="qp.minTickets" type="number"
                  label="Min Tickets" class="col" :rules="[validateQP('minTickets')]" />
                <q-input hide-bottom-space dense outlined v-model.number="qp.discountPercentage" type="number"
                  label="% Desc" class="col" :rules="[validateQP('discountPercentage')]" />
                <q-btn round dense flat color="negative" icon="delete" @click="removeQuickPurchase(index)" />
              </div>
            </div>
          </div>
          <div v-if="formRaffle.quickPurchases.length < 6" class="text-negative text-caption">
            Debe agregar al menos 6 opciones de compra rápida.
          </div>
        </div>
      </div>

      <div class="full-width flex justify-end q-mt-lg">
        <q-btn :disable="loading || loadingRaffle" no-caps unelevated flat color="black"
          class="mr-10 py-14 text-white br-8" @click="$router.back()">
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
import { useRouter } from 'vue-router';
import type { IRaffle, IRaffleQuickPurchase } from '@modules/raffles/infrastructure/interfaces/raffle.interface';
import { getNotifyDefaultOptions } from 'app/src/common/helpers/notify-default-options.helper';
import { useI18n } from 'vue-i18n';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat)


// CONSTANTS
const { t } = useI18n()
const $q = useQuasar();
const $router = useRouter();
const validate = CreateRaffleUseCase.validateAt;
const validatePlace = CreateRaffleUseCase.validatePlaceAt;
const validateQP = CreateRaffleUseCase.validateQuickPurchaseAt;
const rewardOption = [
  { label: 'Número Exacto', value: 'exactNumber' },
  { label: 'Último Número', value: 'lastNumber' },
  { label: 'Últimos Dos Números', value: 'lastTwoNumbers' },
  { label: 'Últimos Tres Números', value: 'lastThreeNumbers' },
];
const placeOptions = [
  {
    label: 'Físico',
    value: 'physical'
  },
  {
    label: 'Dinero',
    value: 'money'
  }
]
const assignmentOptions = [
  { label: 'Incremental', value: 'increment' },
  { label: 'Aleatorio', value: 'random' }
]

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
  startTime: '',
  endTime: '',
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
  raffleSlug: {
    type: String,
    required: false,
  }
});

// HELPER FUNCTIONS
const addPlace = () => {
  formRaffle.places.push({
    place: formRaffle.places.length + 1,
    rewardsYes: 'exactNumber',
    type: 'physical',
    amount: 1,
    lotteryAt: '',
    lotteryTime: '',
    description: '',
    imgUrls: ['']
  });
};

const removePlace = (index: number) => {
  formRaffle.places.splice(index, 1);
  // Re-index places
  formRaffle.places.forEach((p, i) => p.place = i + 1);
};

const addPlaceImgUrl = (placeIndex: number) => {
  formRaffle.places[placeIndex].imgUrls.push('');
};

const removePlaceImgUrl = (placeIndex: number, imgIndex: number) => {
  formRaffle.places[placeIndex].imgUrls.splice(imgIndex, 1);
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
  // Validate each place has at least one image
  for (let i = 0; i < formRaffle.places.length; i++) {
    if (formRaffle.places[i].imgUrls.length === 0) {
      $q.notify({ ...getNotifyDefaultOptions('error'), message: `El lugar #${i + 1} debe tener al menos una imagen.` });
      return;
    }
  }

  if (formRaffle.quickPurchases.length < 6) {
    $q.notify({ ...getNotifyDefaultOptions('error'), message: 'Debe agregar al menos 6 opciones de compra rápida.' });
    return;
  }

  // Clean up empty strings from imgUrls
  formRaffle.imgUrls = formRaffle.imgUrls.filter(url => url.trim() !== '');
  formRaffle.places.forEach(place => {
    place.imgUrls = place.imgUrls.filter((url: string) => url.trim() !== '');
  });

  loading.value = true;

  await formRef.value?.validate();

  if (!props.isUpdate) {
    try {
      const payload = { ...formRaffle };
      payload.places = [...formRaffle.places]

      const isoDateTimeStart = dayjs(
        `${formRaffle.startDate} ${formRaffle.startTime}`,
        'DD/MM/YYYY HH:mm'
      ).toISOString();

      const isoDateTimeEnd = dayjs(
        `${formRaffle.endDate} ${formRaffle.endTime}`,
        'DD/MM/YYYY HH:mm'
      ).toISOString();

      payload.startDate = isoDateTimeStart;
      payload.endDate = isoDateTimeEnd;

      delete payload.startTime;
      delete payload.endTime;

      payload.places.forEach(element => {
        const isoDateTimePlace = dayjs(
          `${element.lotteryAt} ${element.lotteryTime}`,
          'DD/MM/YYYY HH:mm'
        ).toISOString();

        element.lotteryAt = isoDateTimePlace;
        delete element.lotteryTime;
      });

      await CreateRaffleUseCase.handle(payload);
      $q.notify({
        ...getNotifyDefaultOptions('success'),
        message: 'Rifa creada exitosamente.'
      })
      await $router.push('/raffles');
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
    if (!raffle.value?.id) return;
    try {
      await EditRaffleUseCase.handle(formRaffle, raffle.value?.id);
      $q.notify({
        ...getNotifyDefaultOptions('success'),
        message: 'Rifa editada exitosamente.'
      })
      await $router.push('/raffles');
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
    if (formRaffle.quickPurchases.length === 0) {
      const defaults = [
        { minTickets: 4, discountPercentage: 0 },
        { minTickets: 10, discountPercentage: 0 },
        { minTickets: 20, discountPercentage: 0 },
        { minTickets: 50, discountPercentage: 5 },
        { minTickets: 100, discountPercentage: 10 },
        { minTickets: 200, discountPercentage: 15 },
      ];
      formRaffle.quickPurchases.push(...defaults);
    }
    addPlace();
  }
  if (props.isUpdate) {
    // await handleGetRaffle();
  }
});

</script>
