<template>
  <div>
    <q-form class="self-end wp-100" ref="formRef" greedy @submit="handleUploadBank">
      <div class="row">
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Nombre' }}
          </span>
          <q-input :disable="loading || loadingBank" outlined color="app-primary" v-model.trim="formBank.name"
            type="text" ref="nameInp" placeholder="Nombre" class="mt-4" :rules="[
              validate('name')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'DBS' }}
          </span>
          <q-input :disable="loading || loadingBank || props.isUpdate" outlined color="app-primary"
            v-model.trim="formBank.dbs" type="text" ref="dbsInp" placeholder="DBS" class="mt-4" :rules="[
              validate('dbs')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'URL Endpoint' }}
          </span>
          <q-input :disable="loading || loadingBank" outlined color="app-primary" v-model.trim="formBank.urlEndpoint"
            type="text" ref="urlEndpointInp" placeholder="URL Endpoint" class="mt-4" :rules="[
              validate('urlEndpoint')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Secret JWT' }}
          </span>
          <q-input :disable="loading || loadingBank" outlined color="app-primary" v-model.trim="formBank.secretJwt"
            type="text" ref="secretJwtInp" placeholder="Secret JWT" class="mt-4" :rules="[
              validate('secretJwt')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Hash Bank' }}
          </span>
          <q-input :disable="loading || loadingBank" outlined color="app-primary" v-model.trim="formBank.hashBank"
            type="text" ref="hashBankInp" placeholder="Hash Bank" class="mt-4" :rules="[
              validate('hashBank')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'URL Background' }}
          </span>
          <q-input :disable="loading || loadingBank" outlined color="app-primary" v-model.trim="formBank.urlBg"
            type="text" ref="urlBgInp" placeholder="URL Background" class="mt-4" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'URL Logo' }}
          </span>
          <q-input :disable="loading || loadingBank" outlined color="app-primary" v-model.trim="formBank.urlLogo"
            type="text" ref="urlLogoInp" placeholder="URL Logo" class="mt-4" />
        </div>
      </div>

      <div class="row q-mt-md" v-if="!props.isUpdate">
        <div class="col-12 q-pa-md">
          <span class="fs-16 text-bold text-black">Dueño</span>
        </div>
        <div class="col-12 col-md-4 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Nombre del Dueño' }}
          </span>
          <q-input :disable="loading || loadingBank" outlined color="app-primary" v-model.trim="formBank.owner.name"
            type="text" ref="ownerNameInp" placeholder="Nombre del Dueño" class="mt-4" :rules="[
              validateOwner('name')
            ]" />
        </div>
        <div class="col-12 col-md-4 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Email del Dueño' }}
          </span>
          <q-input :disable="loading || loadingBank" outlined color="app-primary" v-model.trim="formBank.owner.email"
            type="email" ref="ownerEmailInp" placeholder="Email del Dueño" class="mt-4" :rules="[
              validateOwner('email')
            ]" />
        </div>
        <div class="col-12 col-md-4 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Teléfono del Dueño' }}
          </span>
          <q-input :disable="loading || loadingBank" outlined color="app-primary" v-model.trim="formBank.owner.phone"
            type="tel" ref="ownerPhoneInp" placeholder="Teléfono del Dueño" class="mt-4" :rules="[
              validateOwner('phone')
            ]" />
        </div>
      </div>

      <div class="full-width flex justify-end q-mt-lg">
        <q-btn :disable="loading || loadingBank" no-caps unelevated flat color="black"
          class="mr-10 py-14 text-white br-8" @click="$router.back()">
          <span>
            {{ 'Cancelar' }}
          </span>
        </q-btn>
        <q-btn no-caps unelevated :disable="loading || loadingBank" :loading="loading" color="app-primary"
          class="py-14 text-white br-8" type="submit">
          <span>
            {{ `${!isUpdate ? 'Registrar' : 'Editar'} banca` }}
          </span>
        </q-btn>
      </div>

    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { QForm, useQuasar } from 'quasar';
import { CreateBankUseCase, EditBankUseCase, GetBankBySlugUseCase } from '@modules/bank/domain/useCases';
import { useRouter } from 'vue-router';
import type { IBank } from '@modules/bank/infrastructure/interfaces/bank.interface';
import { getNotifyDefaultOptions } from 'app/src/common/helpers/notify-default-options.helper';
import { useI18n } from 'vue-i18n';

// CONSTANTS
const { t } = useI18n()
const $q = useQuasar();
const $router = useRouter();
const validate = CreateBankUseCase.validateAt;
const validateOwner = CreateBankUseCase.validateOwnerAt;

// REFS
const formRef = ref<QForm | null>(null);
const loading = ref<boolean>(false);
const bank = ref<IBank | null>(null);
const loadingBank = ref<boolean>(false);

// REACTIVE
const formBank = reactive({
  name: '',
  dbs: '',
  urlEndpoint: '',
  secretJwt: '',
  hashBank: '',
  urlBg: '',
  urlLogo: '',
  owner: {
    name: '',
    email: '',
    phone: '',
  }
});

const props = defineProps({
  isUpdate: {
    type: Boolean,
    default: false,
    required: false,
  },
  bankSlug: {
    type: String,
    required: false,
  }
});

// FUNCTIONS
const handleUploadBank = async () => {
  loading.value = true;

  await formRef.value?.validate();

  if (!props.isUpdate) {
    try {
      if (formBank.urlBg === '') {
        formBank.urlBg = null
      }
      if (formBank.urlLogo === '') {
        formBank.urlLogo = null
      }
      const response: any = await CreateBankUseCase.handle(formBank);

      $q.notify({
        ...getNotifyDefaultOptions('success'),
        message: `Banca creada exitosamente, la contraseña del dueño es: "${response?.data?.data?.args?.ownerPassword}".`,
        timeout: 0
      })

      await $router.push('/banks');
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
    if (!bank.value.id) return;
    try {
      if (formBank.urlBg === '') {
        formBank.urlBg = null
      }
      if (formBank.urlLogo === '') {
        formBank.urlLogo = null
      }
      const payload = { ...formBank }
      delete payload.owner
      delete payload.dbs
      await EditBankUseCase.handle(payload, bank.value.id);
      $q.notify({
        ...getNotifyDefaultOptions('success'),
        message: 'Banca editado exitosamente.'
      })
      await $router.push('/banks');
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

const handleGetBank = async () => {
  if (!props.bankSlug) return;
  loadingBank.value = true;

  try {
    const response = await GetBankBySlugUseCase.handle(props.bankSlug);
    if (response && response.data) {
      bank.value = response.data.data;
      formBank.name = bank.value.name;
      formBank.dbs = bank.value.dbs;
      formBank.urlEndpoint = bank.value.urlEndpoint;
      formBank.secretJwt = bank.value.secretJwt;
      formBank.hashBank = bank.value.hashBank;
      formBank.urlBg = bank.value.urlBg || '';
      formBank.urlLogo = bank.value.urlLogo || '';
      if (bank.value.owner) {
        formBank.owner.name = bank.value.owner.name;
        formBank.owner.email = bank.value.owner.email;
        formBank.owner.phone = bank.value.owner.phone;
      }
    }
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
  loadingBank.value = false;
};

// LIFECYCLE HOOKS
onMounted(async () => {
  if (props.isUpdate) {
    await handleGetBank();
  }
});

</script>
