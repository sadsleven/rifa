<template>
  <div>
    <q-form class="self-end flex column wp-100" ref="formRef" greedy @submit="handleUploadRole">
      <div class="row">
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Nombre' }}
          </span>
          <q-input :disable="loading || loadingRole" outlined color="app-primary" v-model.trim="formRole.name"
            type="text" ref="nameInp" placeholder="Rol" class="mt-4" :rules="[
              validate('name')
            ]" />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Descripción' }}
          </span>
          <q-input :disable="loading || loadingRole" outlined color="app-primary" v-model.trim="formRole.description"
            type="textarea" ref="descriptionInp" placeholder="Descripción" class="mt-4" :rules="[
              validate('description')
            ]" />
        </div>

        <div class="col-12 q-pa-md">
          <span class="fs-14 text-black">
            {{ 'Permisos' }}
          </span>
          <q-select :disable="loading || loadingRole || loadingPermissions" :loading="loadingPermissions" use-chips
            style="max-width: 100%;" stack-label class="mt-4" outlined color="app-primary"
            v-model.trim="formRole.permissions" emit-value map-options :options="permissions" multiple
            ref="permissionsInp" placeholder="Seleccionar" :rules="[
              validate('permissions')
            ]">
            <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
              <q-item v-if="!opt.cannotSelect" v-bind="itemProps">
                <q-item-section side>
                  <q-checkbox color="app-primary" :model-value="selected" @update:model-value="toggleOption(opt)" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-black">
                    {{ opt.label }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <div v-else class="px-15 py-10  text-black bg-grey-3">
                {{ opt.label }}
              </div>
            </template>
            <template #selected-item="{ opt }">
              <q-chip color="app-primary" class="fs-12 text-white text-medium">
                {{ opt.label }}
              </q-chip>
            </template>
          </q-select>
        </div>
      </div>
      <div class="full-width flex justify-end">
        <q-btn :disable="loading || loadingRole || loadingPermissions" no-caps unelevated flat color="black"
          class="mr-10 py-14 text-white br-8" @click="$router.back()">
          <span>
            {{ 'Cancelar' }}
          </span>
        </q-btn>
        <q-btn no-caps unelevated :disable="loading || loadingRole || loadingPermissions" :loading="loading"
          color="app-primary" class="py-14 text-white br-8" type="submit">
          <span>
            {{ `${!isUpdate ? 'Registrar' : 'Editar'} rol` }}
          </span>
        </q-btn>
      </div>

    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { QForm, useQuasar } from 'quasar';
import { CreateRoleUseCase, EditRoleUseCase, GetPermissionsUseCase, GetRoleBySlugUseCase } from '@modules/roles/domain/useCases';
import { useRouter } from 'vue-router';
import type { IRole } from '@modules/roles/infrastructure/interfaces/role.interface';
import { getNotifyDefaultOptions } from 'app/src/common/helpers/notify-default-options.helper';
import { useI18n } from 'vue-i18n';
import { EditRolePermissionsUseCase } from '../../domain/useCases/edit-role-permissions.useCase';

// CONSTANTS
const { t } = useI18n()
const $q = useQuasar();
const $router = useRouter();
const validate = CreateRoleUseCase.validateAt;

// REFS
const formRef = ref<QForm | null>(null);
const loading = ref<boolean>(false);
const role = ref<IRole | null>(null);
const permissions = ref<string[]>([]);
const loadingPermissions = ref<boolean>(false);
const loadingRole = ref<boolean>(false);

// REACTIVE
const formRole = reactive({
  name: '',
  description: '',
  permissions: [],
});

const props = defineProps({
  isUpdate: {
    type: Boolean,
    default: false,
    required: false,
  },
  admin: {
    type: Boolean,
    default: true,
    required: false,
  },
});

// FUNCTIONS
const handleUploadRole = async () => {
  loading.value = true;

  await formRef.value.validate();

  if (!props.isUpdate) {
    try {
      await CreateRoleUseCase.handle(formRole, props.admin);
      $q.notify({
        ...getNotifyDefaultOptions('success'),
        message: 'Rol creado exitosamente.'
      })
      await $router.push(`/roles${!props.admin ? '/owners' : ''}`);
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
    try {
      await EditRoleUseCase.handle({ name: formRole.name, description: formRole.description }, role.value.id, props.admin);
      await EditRolePermissionsUseCase.handle({ permissions: formRole.permissions }, role.value.id, props.admin);
      $q.notify({
        ...getNotifyDefaultOptions('success'),
        message: 'Rol editado exitosamente.'
      })
      await $router.push(`/roles${!props.admin ? '/owners' : ''}`);
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

const handleGetPermissions = async () => {
  permissions.value = [];
  loadingPermissions.value = true;

  try {
    const response: any = await GetPermissionsUseCase.handle(props.admin);
    const permissionsRaw = response?.data?.data ?? [];
    const options = [];
    permissionsRaw.filter(permission => permission.target !== 'app').forEach(element => {
      options.push({ label: element.target, value: null, cannotSelect: true });
      element.permissions.forEach((permission) => {
        options.push({ label: permission.description, value: permission.value });
      });
    });
    permissions.value = options;
    loadingPermissions.value = false;
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

const handleGetRole = async () => {
  loadingRole.value = true;

  try {
    const response: any = await GetRoleBySlugUseCase.handle($router.currentRoute.value.params.name as string, props.admin);
    role.value = response.data.data;
    formRole.name = role.value.name;
    formRole.description = role.value.description;
    formRole.permissions = role.value.permissions;
    loadingRole.value = false;
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
  if (props.isUpdate) {
    await Promise.all([handleGetPermissions(), handleGetRole()]);
  } else {
    await handleGetPermissions();
  }
});

</script>
