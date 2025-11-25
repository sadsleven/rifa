<template>
  <div>
    <q-form class="self-end flex column wp-100 hp-60-vh" ref="formRef" greedy @submit="handleUploadAdmin">
      <div class="row">
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Nombre' }}
          </span>
          <q-input :disable="loading || loadingAdmin" outlined color="app-primary" v-model.trim="formAdmin.name"
            type="text" ref="nameInp" placeholder="Nombre" class="mt-4" :rules="[
              validate('name')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Email' }}
          </span>
          <q-input :disable="loading || loadingAdmin" outlined color="app-primary" v-model.trim="formAdmin.email"
            type="email" ref="emailInp" placeholder="Email" class="mt-4" :rules="[
              validate('email')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Teléfono' }}
          </span>
          <q-input :disable="loading || loadingAdmin" outlined color="app-primary" v-model.trim="formAdmin.phone"
            type="tel" ref="phoneInp" placeholder="Teléfono" class="mt-4" :rules="[
              validate('phone')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Roles' }}
          </span>
          <q-select :disable="loading || loadingAdmin" outlined color="app-primary" v-model="formAdmin.roles"
            :options="roleOptions" option-value="id" option-label="name" placeholder="Roles" class="mt-4" multiple
            emit-value map-options>
            <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-bind="itemProps">
                <q-item-section side>
                  <q-checkbox color="app-primary" :model-value="selected" @update:model-value="toggleOption(opt)" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-black">
                    {{ opt.name }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
            <template #selected-item="{ opt }">
              <q-chip color="app-primary" class="fs-12 text-white text-medium">
                {{ opt.name }}
              </q-chip>
            </template>
          </q-select>
        </div>
      </div>
      <div class="full-width flex justify-end">
        <q-btn :disable="loading || loadingAdmin" no-caps unelevated flat color="black"
          class="mr-10 py-14 text-white br-8" @click="$router.back()">
          <span>
            {{ 'Cancelar' }}
          </span>
        </q-btn>
        <q-btn no-caps unelevated :disable="loading || loadingAdmin" :loading="loading" color="app-primary"
          class="py-14 text-white br-8" type="submit">
          <span>
            {{ `${!isUpdate ? 'Registrar' : 'Editar'} admin` }}
          </span>
        </q-btn>
      </div>

    </q-form>

    <q-dialog v-model="confirmCreation" persistent>
      <q-card style="max-width: 450px; width: 100%;">
        <q-card-section class="row items-center justify-center">
          <div class="fs-20 text-semi-bold lh-24 text-center text-black q-mt-md">Administrador {{ formAdmin.name }}
            creado
            exitosamente</div>
        </q-card-section>

        <q-card-section class="row items-center text-center  justify-center q-px-lg q-pb-none">
          <div>
            Aca puedes copiar la contraseña del administrador y luego cerrar este modal
          </div>
          <div class="text-app-primary q-mt-md">
            {{ passwordUser }}
          </div>
          <q-btn round flat icon="content_copy" color="app-primary" class="q-ml-sm q-mt-md"
            @click="copyToClipboard(passwordUser)">

            <q-tooltip>Copiar contraseña</q-tooltip>
          </q-btn>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn no-caps class="q-mt-md q-mb-md br-6 text-semi-bold " style="width: 132px;" label="Aceptar"
            color="app-primary" :disable="!passwordCopied" @click="$router.back()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { QForm, useQuasar, copyToClipboard as copy } from 'quasar';
import { CreateAdminUseCase, EditAdminUseCase, GetAdminByIdUseCase, AssignRoleToAdminUseCase } from '@modules/admin/domain/useCases';
import { GetRolesUseCase } from '@modules/roles/domain/useCases';
import { useRouter } from 'vue-router';
import type { IAdmin } from '@modules/admin/infrastructure/interfaces/admin.interface';
import { getNotifyDefaultOptions } from 'app/src/common/helpers/notify-default-options.helper';
import { useI18n } from 'vue-i18n';

// CONSTANTS
const { t } = useI18n()
const $q = useQuasar();
const $router = useRouter();
const validate = CreateAdminUseCase.validateAt;

// REFS
const formRef = ref<QForm | null>(null);
const loading = ref<boolean>(false);
const admin = ref<IAdmin | null>(null);
const loadingAdmin = ref<boolean>(false);
const roleOptions = ref<{ id: number; name: string }[]>([]);
const confirmCreation = ref<boolean>(false);
const passwordUser = ref<string>('');
const passwordCopied = ref<boolean>(false);

// REACTIVE
const formAdmin = reactive({
  name: '',
  email: '',
  phone: '',
  roles: [] as number[],
});

const props = defineProps({
  isUpdate: {
    type: Boolean,
    default: false,
    required: false,
  },
  adminId: {
    type: Number,
    required: false,
  }
});

// FUNCTIONS
const handleUploadAdmin = async () => {
  loading.value = true;

  await formRef.value?.validate();

  if (!props.isUpdate) {
    try {
      const response: any = await CreateAdminUseCase.handle({ name: formAdmin.name, email: formAdmin.email, phone: formAdmin.phone });

      if (formAdmin.roles.length > 0) {
        await AssignRoleToAdminUseCase.handle(formAdmin.roles, response?.data?.data?.args?.id);
      }

      passwordUser.value = response?.data?.data?.args?.pass
      confirmCreation.value = true
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
    if (!props.adminId) return;
    try {
      await EditAdminUseCase.handle({ name: formAdmin.name, email: formAdmin.email, phone: formAdmin.phone }, props.adminId);

      if (formAdmin.roles.length > 0) {
        await AssignRoleToAdminUseCase.handle(formAdmin.roles, props.adminId);
      }

      $q.notify({
        ...getNotifyDefaultOptions('success'),
        message: 'Admin editado exitosamente.'
      })
      await $router.push('/admins');
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

const handleGetAdmin = async () => {
  if (!props.adminId) return;
  loadingAdmin.value = true;

  try {
    const response = await GetAdminByIdUseCase.handle(props.adminId);
    if (response && response.data) {
      admin.value = response.data.data;
      formAdmin.name = admin.value.name;
      formAdmin.email = admin.value.email;
      formAdmin.phone = admin.value.phone;
      formAdmin.roles = admin.value.roles ? admin.value.roles.map(r => r.id) : [];
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
  loadingAdmin.value = false;
};

const getRoles = async () => {
  try {
    const response = await GetRolesUseCase.handle('');
    if (response && response.data) {
      roleOptions.value = response.data.data;
    }
  } catch (e: any) {
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

const copyToClipboard = async (text: string) => {
  passwordCopied.value = true
  try {
    await copy(text)
    $q.notify({
      ...getNotifyDefaultOptions('success'),
      message: 'Contraseña copiada al portapapeles'
    })
  } catch {
    $q.notify({
      ...getNotifyDefaultOptions('error'),
      message: 'Error al copiar la contraseña'
    })
  }
}

// LIFECYCLE HOOKS
onMounted(async () => {
  await getRoles();
  if (props.isUpdate) {
    await handleGetAdmin();
  }
});

</script>
