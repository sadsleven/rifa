<template>
  <q-page class="q-pa-lg">
    <h1 class="fs-25 no-margin q-pb-lg">
      <q-btn flat round icon="arrow_back" color="app-primary" @click="$router.back()" />
      Rifa {{ raffle.title }}
    </h1>
    <div v-if="!isLoading" class="row q-col-gutter-md">
      <!-- Main Raffle Info Card -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-black text-semi-bold q-mb-md">Información General</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <div class="text-semi-bold">Título:</div>
                <div class="fs-16">{{ raffle.title ?? 'No disponible' }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-semi-bold">Estado:</div>
                <div class="fs-16">
                  {{ t(`raffleStatus.${raffle.status}`) ?? 'No disponible' }}
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-semi-bold">Descripción:</div>
                <div class="fs-16">{{ raffle.description ?? 'No disponible' }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-semi-bold">Tipo de Asignación:</div>
                <div class="fs-16">{{assignmentOptions.find(ro => ro.value === raffle.assignmentType)?.label ?? `No
                  disponible` }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-semi-bold">Nano ID:</div>
                <div class="fs-16">{{ raffle.nanoId ?? 'No disponible' }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-semi-bold">Slug:</div>
                <div class="fs-16">{{ raffle.slug ?? 'No disponible' }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-semi-bold">Fecha Inicio:</div>
                <div class="fs-16">{{ dayjs.unix(raffle.startDate).format('DD/MM/YYYY h:mm A') }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-semi-bold">Fecha Fin:</div>
                <div class="fs-16">{{ dayjs.unix(raffle.endDate).format('DD/MM/YYYY h:mm A') }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-semi-bold">Moneda:</div>
                <div class="fs-16">{{ raffle.currency }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-semi-bold">Precio por Ticket:</div>
                <div class="fs-16">{{ raffle.ticketPrice }} {{ raffle.currency }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-semi-bold">Dígitos del Ticket:</div>
                <div class="fs-16">{{ raffle.ticketDigits }}</div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-semi-bold">Tickets Disponibles:</div>
                <div class="fs-16">{{ raffle.ticketAvailable }}</div>
              </div>
              <div class="col-12 col-md-6" v-if="raffle.totalTicketsSold !== null">
                <div class="text-semi-bold">Tickets Vendidos:</div>
                <div class="fs-16">{{ raffle.totalTicketsSold ?? 0 }}</div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="text-h6 text-black text-semi-bold q-mb-md">Acciones</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Images Card -->
      <div class="col-12" v-if="raffle.mainImgUrl || raffle.imgUrls?.length">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-black text-semi-bold q-mb-md">Imágenes</div>
            <div class="row q-col-gutter-md">
              <div class="col-12" v-if="raffle.mainImgUrl">
                <div class="text-semi-bold">Imagen Principal:</div>
                <div class="q-mt-sm">
                  <q-img :src="raffle.mainImgUrl" style="max-width: 300px; border-radius: 8px;" />
                </div>
              </div>
              <div class="col-12" v-if="raffle.imgUrls?.length">
                <div class="text-semi-bold">Imágenes Adicionales:</div>
                <div class="row q-col-gutter-sm q-mt-sm">
                  <div class="col-12 col-sm-6 col-md-4" v-for="(url, index) in raffle.imgUrls" :key="index">
                    <q-img :src="url" style="max-width: 300px; border-radius: 8px;" />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Places Card -->
      <div class="col-12" v-if="raffle.places?.length">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-black text-semi-bold q-mb-md">Lugares</div>
            <div class="row q-col-gutter-md">
              <div class="col-12" v-for="(place, index) in raffle.places" :key="index">
                <q-card flat bordered>
                  <q-card-section>
                    <div class="row q-col-gutter-md">
                      <div class="col-12">
                        <div class="text-h6">Lugar #{{ place.place }}</div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="text-semi-bold">Tipo:</div>
                        <div>{{placeOptions.find(ro => ro.value === place.type)?.label}}</div>
                      </div>
                      <div class="col-12 col-md-6" v-if="place.amount">
                        <div class="text-semi-bold">Monto:</div>
                        <div>{{ place.amount }} {{ raffle.currency }}</div>
                      </div>
                      <div class="col-12 col-md-6">
                        <div class="text-semi-bold">Tipo de Premio:</div>
                        <div>{{rewardOption.find(ro => ro.value === place.rewardsYes)?.label}}</div>
                      </div>
                      <div class="col-12 col-md-6" v-if="place.description">
                        <div class="text-semi-bold">Descripción:</div>
                        <div>{{ place.description }}</div>
                      </div>
                      <div class="col-12 col-md-6" v-if="place.lotteryAt">
                        <div class="text-semi-bold">Fecha de Sorteo:</div>
                        <div>{{ dayjs.unix(Number(place.lotteryAt)).format('DD/MM/YYYY h:mm A') }}</div>
                      </div>
                      <div class="col-12 col-md-6" v-if="place.status">
                        <div class="text-semi-bold">Estado:</div>
                        <div>
                          {{ place.status === 'toAward' ? 'Por premiar' : 'Premiado' }}
                        </div>
                      </div>
                      <div class="col-12 col-md-6" v-if="place.winningTicketNumber">
                        <div class="text-semi-bold">Número Ganador:</div>
                        <div class="text-positive text-bold">{{ place.winningTicketNumber }}</div>
                      </div>
                      <div class="col-12 col-md-6" v-if="place.numberOfWinners">
                        <div class="text-semi-bold">Número de Ganadores:</div>
                        <div>{{ place.numberOfWinners }}</div>
                      </div>
                      <!-- Place Images -->
                      <div class="col-12" v-if="place.imgUrls?.length">
                        <div class="text-semi-bold">Imágenes del Premio:</div>
                        <div class="row q-col-gutter-sm q-mt-sm">
                          <div class="col-6 col-sm-4 col-md-3" v-for="(img, imgIndex) in place.imgUrls" :key="imgIndex">
                            <q-img :src="img" style="border-radius: 8px;" ratio="1" />
                          </div>
                        </div>
                      </div>
                      <!-- Place Rewards -->
                      <div class="col-12" v-if="place.rewards?.length">
                        <div class="text-semi-bold q-mb-sm">Premios:</div>
                        <div class="row q-col-gutter-sm">
                          <div class="col-12" v-for="(reward, rewardIndex) in place.rewards" :key="rewardIndex">
                            <q-card flat bordered class="bg-grey-1">
                              <q-card-section>
                                <div class="text-weight-medium">{{ reward.name }}</div>
                                <div class="text-caption">{{ reward.description }}</div>
                                <div class="row q-col-gutter-xs q-mt-sm" v-if="reward.imgUrls?.length">
                                  <div class="col-4" v-for="(rImg, rImgIndex) in reward.imgUrls" :key="rImgIndex">
                                    <q-img :src="rImg" style="border-radius: 4px;" ratio="1" />
                                  </div>
                                </div>
                              </q-card-section>
                            </q-card>
                          </div>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Quick Purchases / Discounts Card -->
      <div class="col-12" v-if="raffle.quickPurchases?.length || raffle.discounts?.length">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-black text-semi-bold q-mb-md">Descuentos por Compra Rápida</div>
            <div class="row q-col-gutter-md">
              <div class="col-12 col-sm-6 col-md-4"
                v-for="(discount, index) in (raffle.quickPurchases || raffle.discounts)" :key="index">
                <q-card flat bordered class="bg-green-1">
                  <q-card-section>
                    <div class="text-center">
                      <div class="text-h4 text-positive">{{ discount.discountPercentage }}%</div>
                      <div class="text-caption">de descuento</div>
                      <q-separator class="q-my-sm" />
                      <div class="text-body2">
                        Comprando <span class="text-weight-bold">{{ discount.minTickets }}</span> tickets o más
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Tabs Section -->
      <div class="">
        <q-tabs v-model="tab" inline-label class="bg-app-primary text-white shadow-2">
          <q-tab name="tickets" icon="mdi-ticket" label="Tickets" />
          <q-tab name="top10" icon="mdi-trophy" label="Top 10" />
        </q-tabs>
      </div>

      <div class="col-12">
        <q-tab-panels v-model="tab" animated keep-alive>
          <q-tab-panel name="tickets">
            <TicketComponent :raffle-id="raffle.id"></TicketComponent>
          </q-tab-panel>

          <q-tab-panel name="top10">
            <TopTenComponent :raffle-id="raffle.id"></TopTenComponent>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
    <div v-else class="flex flex-center full-height">
      <q-spinner color="app-primary" size="3em" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { GetRaffleBySlugUseCase } from '@modules/raffles/domain/useCases';
import { useRoute } from 'vue-router';
import TicketComponent from '@modules/raffles/presentation/components/TicketComponent.vue';
import type { IRaffle } from '@modules/raffles/infrastructure/interfaces/raffle.interface';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import TopTenComponent from '@modules/raffles/presentation/components/TopTenComponent.vue';

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


const { t } = useI18n()
const route = useRoute()
const slug = `${route.params.slug}`
const raffle = ref<IRaffle>({
  title: '',
  description: '',
  mainImgUrl: '',
  imgUrls: [],
  startDate: 0,
  endDate: 0,
  ticketDigits: 3,
  ticketPrice: 0,
  currency: 'VES',
  assignmentType: '',
  places: [],
  discounts: [],
  id: 0,
  nanoId: '',
  slug: '',
  status: 'draft',
  ticketAvailable: 0
});
const isLoading = ref(false);
const tab = ref<'top10' | 'tickets'>('tickets');

onMounted(async () => {
  if (slug) {
    isLoading.value = true;
    try {
      const response: any = await GetRaffleBySlugUseCase.handle(slug);
      if (response) {
        raffle.value = response.data.data;
      }
    } finally {
      isLoading.value = false;
    }
  }
});
</script>
