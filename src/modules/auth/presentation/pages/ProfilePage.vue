<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="col-12 col-md-8 col-lg-6">
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h5 text-app-primary">Mi Perfil</div>
          </q-card-section>

          <q-card-section>
            <div class="q-gutter-md">
              <!-- User Info Display -->
              <div class="row q-col-gutter-md">
                <div class="col-12">
                  <q-input :model-value="authStore.GetUser?.name" label="Nombre" readonly outlined>
                    <template v-slot:prepend>
                      <q-icon name="mdi-account" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <q-input :model-value="authStore.GetUser?.email" label="Email" readonly outlined>
                    <template v-slot:prepend>
                      <q-icon name="mdi-email" />
                    </template>
                    <template v-slot:append>
                      <q-btn flat round dense icon="mdi-pencil" color="app-primary" @click="openEmailDialog" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12">
                  <q-input :model-value="authStore.GetUser?.phone" label="Teléfono" readonly outlined>
                    <template v-slot:prepend>
                      <q-icon name="mdi-phone" />
                    </template>
                    <template v-slot:append>
                      <q-btn flat round dense icon="mdi-pencil" color="app-primary" @click="openPhoneDialog" />
                    </template>
                  </q-input>
                </div>
              </div>

              <!-- Change Password Button -->
              <div class="row q-mt-md">
                <div class="col-12">
                  <q-btn class="full-width" color="app-primary" label="Cambiar Contraseña" icon="mdi-lock"
                    @click="openPasswordDialog" />
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Change Password Dialog -->
    <q-dialog v-model="passwordDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Cambiar Contraseña</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form ref="passwordFormRef" @submit="handleChangePassword">
            <q-input v-model="passwordForm.currentPassword" type="password" color="app-primary"
              label="Contraseña Actual" outlined class="q-mb-md" :rules="[validatePassword('currentPassword')]">
              <template v-slot:append>
                <q-btn size="md" flat round icon="mdi-eye" color="grey" />
              </template>
            </q-input>

            <q-input v-model="passwordForm.password" type="password" color="app-primary" label="Nueva Contraseña"
              outlined class="q-mb-md" :rules="[validatePassword('password')]">
              <template v-slot:append>
                <q-btn size="md" flat round icon="mdi-eye" color="grey" />
              </template>
            </q-input>

            <q-input v-model="passwordForm.confirmPassword" type="password" color="app-primary"
              label="Confirmar Nueva Contraseña" outlined class="q-mb-md"
              :rules="[validatePassword('confirmPassword')]">
              <template v-slot:append>
                <q-btn size="md" flat round icon="mdi-eye" color="grey" />
              </template>
            </q-input>

            <div class="row q-gutter-sm justify-end">
              <q-btn label="Cancelar" color="grey" flat v-close-popup />
              <q-btn label="Cambiar" type="submit" color="app-primary" :loading="passwordLoading" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Change Email Dialog -->
    <q-dialog v-model="emailDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Cambiar Email</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form v-if="!emailOtpSent" ref="emailRequestFormRef" @submit="handleRequestEmailChange">
            <q-input color="app-primary" v-model="emailForm.email" type="email" label="Nuevo Email" outlined
              class="q-mb-md" :rules="[validateEmailRequest('email')]">
            </q-input>

            <div class="row q-gutter-sm justify-end">
              <q-btn label="Cancelar" color="grey" flat @click="closeEmailDialog" />
              <q-btn label="Enviar Código" type="submit" color="app-primary" :loading="emailLoading" />
            </div>
          </q-form>

          <q-form v-else ref="emailConfirmFormRef" @submit="handleConfirmEmailChange">
            <q-input v-model="emailForm.email" type="email" label="Nuevo Email" readonly outlined class="q-mb-md">
              <template v-slot:prepend>
                <q-icon name="mdi-email" />
              </template>
            </q-input>

            <q-input v-model="emailForm.code" label="Código de Verificación" outlined class="q-mb-md"
              :rules="[validateEmailConfirm('code')]">
              <template v-slot:prepend>
                <q-icon name="mdi-shield-key" />
              </template>
            </q-input>

            <div class="row q-gutter-sm justify-end">
              <q-btn label="Cancelar" color="grey" flat @click="closeEmailDialog" />
              <q-btn label="Verificar" type="submit" color="app-primary" :loading="emailLoading" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Change Phone Dialog -->
    <q-dialog v-model="phoneDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Cambiar Teléfono</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form v-if="!phoneOtpSent" ref="phoneRequestFormRef" @submit="handleRequestPhoneChange">
            <q-input v-model="phoneForm.phone" color="app-primary" label="Nuevo Teléfono" outlined class="q-mb-md"
              hint="Formato: +584141234567" :rules="[validatePhoneRequest('phone')]">
            </q-input>

            <div class="row q-gutter-sm justify-end">
              <q-btn label="Cancelar" color="grey" flat @click="closePhoneDialog" />
              <q-btn label="Enviar Código" type="submit" color="app-primary" :loading="phoneLoading" />
            </div>
          </q-form>

          <q-form v-else ref="phoneConfirmFormRef" @submit="handleConfirmPhoneChange">
            <q-input v-model="phoneForm.phone" label="Nuevo Teléfono" readonly outlined class="q-mb-md">
              <template v-slot:prepend>
                <q-icon name="mdi-phone" />
              </template>
            </q-input>

            <q-input v-model="phoneForm.code" label="Código de Verificación" outlined class="q-mb-md"
              :rules="[validatePhoneConfirm('code')]">
              <template v-slot:prepend>
                <q-icon name="mdi-shield-key" />
              </template>
            </q-input>

            <div class="row q-gutter-sm justify-end">
              <q-btn label="Cancelar" color="grey" flat @click="closePhoneDialog" />
              <q-btn label="Verificar" type="submit" color="app-primary" :loading="phoneLoading" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { QForm, useQuasar } from 'quasar';
import { useAuthStore } from '@modules/auth/domain/store';
import { ChangePasswordUseCase, ChangeEmailUseCase, ChangePhoneUseCase } from '@modules/auth/domain/useCases';
import { getNotifyDefaultOptions } from '@common/helpers/notify-default-options.helper';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const $q = useQuasar();
const authStore = useAuthStore();

// Validation functions
const validatePassword = ChangePasswordUseCase.validateAt;
const validateEmailRequest = ChangeEmailUseCase.validateAtRequest;
const validateEmailConfirm = ChangeEmailUseCase.validateAtConfirm;
const validatePhoneRequest = ChangePhoneUseCase.validateAtRequest;
const validatePhoneConfirm = ChangePhoneUseCase.validateAtConfirm;

// Form refs
const passwordFormRef = ref<QForm | null>(null);
const emailRequestFormRef = ref<QForm | null>(null);
const emailConfirmFormRef = ref<QForm | null>(null);
const phoneRequestFormRef = ref<QForm | null>(null);
const phoneConfirmFormRef = ref<QForm | null>(null);

// Password Dialog
const passwordDialog = ref(false);
const passwordLoading = ref(false);
const passwordForm = reactive({
  currentPassword: '',
  password: '',
  confirmPassword: '',
});

// Email Dialog
const emailDialog = ref(false);
const emailLoading = ref(false);
const emailOtpSent = ref(false);
const emailForm = reactive({
  email: '',
  code: '',
});

// Phone Dialog
const phoneDialog = ref(false);
const phoneLoading = ref(false);
const phoneOtpSent = ref(false);
const phoneForm = reactive({
  phone: '',
  code: '',
});

// Password Functions
const openPasswordDialog = () => {
  passwordDialog.value = true;
  passwordForm.currentPassword = '';
  passwordForm.password = '';
  passwordForm.confirmPassword = '';
};

const handleChangePassword = async () => {
  passwordLoading.value = true;

  await passwordFormRef.value?.validate();

  try {
    await ChangePasswordUseCase.handle(passwordForm);

    $q.notify({
      ...getNotifyDefaultOptions('success'),
      message: 'Contraseña cambiada exitosamente',
    });

    passwordDialog.value = false;
  } catch (e: any) {
    let errorMessage = t(`APIerrors.${e?.response?.data?.errorCode}`);

    if (errorMessage.includes(e?.response?.data?.errorCode)) {
      errorMessage = e?.response?.data?.errorMessage ?? 'Error al cambiar la contraseña';
    }

    $q.notify({
      ...getNotifyDefaultOptions('error'),
      message: errorMessage,
    });
  } finally {
    passwordLoading.value = false;
  }
};

// Email Functions
const openEmailDialog = () => {
  emailDialog.value = true;
  emailOtpSent.value = false;
  emailForm.email = '';
  emailForm.code = '';
};

const closeEmailDialog = () => {
  emailDialog.value = false;
  emailOtpSent.value = false;
  emailForm.email = '';
  emailForm.code = '';
};

const handleRequestEmailChange = async () => {
  emailLoading.value = true;

  await emailRequestFormRef.value?.validate();

  try {
    await ChangeEmailUseCase.requestChange({ email: emailForm.email });

    $q.notify({
      ...getNotifyDefaultOptions('success'),
      message: 'Código enviado a tu nuevo email',
    });

    emailOtpSent.value = true;
  } catch (e: any) {
    let errorMessage = t(`APIerrors.${e?.response?.data?.errorCode}`);

    if (errorMessage.includes(e?.response?.data?.errorCode)) {
      errorMessage = e?.response?.data?.errorMessage ?? 'Error al enviar el código';
    }

    $q.notify({
      ...getNotifyDefaultOptions('error'),
      message: errorMessage,
    });
  } finally {
    emailLoading.value = false;
  }
};

const handleConfirmEmailChange = async () => {
  emailLoading.value = true;

  await emailConfirmFormRef.value?.validate();

  try {
    await ChangeEmailUseCase.confirmChange(emailForm);

    $q.notify({
      ...getNotifyDefaultOptions('success'),
      message: 'Email cambiado exitosamente',
    });

    closeEmailDialog();
  } catch (e: any) {
    let errorMessage = t(`APIerrors.${e?.response?.data?.errorCode}`);

    if (errorMessage.includes(e?.response?.data?.errorCode)) {
      errorMessage = e?.response?.data?.errorMessage ?? 'Error al verificar el código';
    }

    $q.notify({
      ...getNotifyDefaultOptions('error'),
      message: errorMessage,
    });
  } finally {
    emailLoading.value = false;
  }
};

// Phone Functions
const openPhoneDialog = () => {
  phoneDialog.value = true;
  phoneOtpSent.value = false;
  phoneForm.phone = '';
  phoneForm.code = '';
};

const closePhoneDialog = () => {
  phoneDialog.value = false;
  phoneOtpSent.value = false;
  phoneForm.phone = '';
  phoneForm.code = '';
};

const handleRequestPhoneChange = async () => {
  phoneLoading.value = true;

  await phoneRequestFormRef.value?.validate();

  try {
    await ChangePhoneUseCase.requestChange({ phone: phoneForm.phone });

    $q.notify({
      ...getNotifyDefaultOptions('success'),
      message: 'Código enviado a tu nuevo teléfono',
    });

    phoneOtpSent.value = true;
  } catch (e: any) {
    let errorMessage = t(`APIerrors.${e?.response?.data?.errorCode}`);

    if (errorMessage.includes(e?.response?.data?.errorCode)) {
      errorMessage = e?.response?.data?.errorMessage ?? 'Error al enviar el código';
    }

    $q.notify({
      ...getNotifyDefaultOptions('error'),
      message: errorMessage,
    });
  } finally {
    phoneLoading.value = false;
  }
};

const handleConfirmPhoneChange = async () => {
  phoneLoading.value = true;

  await phoneConfirmFormRef.value?.validate();

  try {
    await ChangePhoneUseCase.confirmChange(phoneForm);

    $q.notify({
      ...getNotifyDefaultOptions('success'),
      message: 'Teléfono cambiado exitosamente',
    });

    closePhoneDialog();
  } catch (e: any) {
    let errorMessage = t(`APIerrors.${e?.response?.data?.errorCode}`);

    if (errorMessage.includes(e?.response?.data?.errorCode)) {
      errorMessage = e?.response?.data?.errorMessage ?? 'Error al verificar el código';
    }

    $q.notify({
      ...getNotifyDefaultOptions('error'),
      message: errorMessage,
    });
  } finally {
    phoneLoading.value = false;
  }
};
</script>
