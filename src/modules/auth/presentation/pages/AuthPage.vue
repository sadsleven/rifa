<template>
  <q-page class="flex justify-center items-center">

    <q-card style="width: 390px" class="q-pa-md q-mt-lg br-10 text-light-black">
      <p class="mt-15 text-black text-center text-weight-bold fs-20">
        Inicia Sesión
      </p>

      <q-form class="self-end flex column wp-100" ref="formRef" @submit="handleLogin">


        <span class="fs-14 text-black">
          Email
        </span>
        <q-input outlined color="app-primary" v-model.trim="formAuth.emailOrPhone" type="email" ref="emailInp"
          placeholder="admin@email.com" class="mt-4 mb-15" :rules="[
            validate('emailOrPhone')
          ]" hide-bottom-space />

        <span class="fs-14 text-black">
          Contraseña
        </span>
        <q-input outlined color="app-primary" v-model.trim="formAuth.password" :type="isPwd ? 'password' : 'text'"
          ref="emailInp" placeholder="*******" class=" br-8 mt-4 mb-15" :rules="[
            validate('password')
          ]" hide-bottom-space>
          <template v-slot:append>
            <q-icon class="cursor-pointer" :name="isPwd ? 'mdi-eye-outline' : 'mdi-eye-closed'" @click="isPwd = !isPwd"
              color="app-primary">

            </q-icon>
          </template>
        </q-input>

        <q-btn no-caps unelevated :loading="loading" color="app-primary" class="wp-100 py-14 text-white br-8"
          type="submit">
          <span>
            Enviar
          </span>
        </q-btn>
      </q-form>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { reactive, ref } from 'vue';
import { QForm, useQuasar } from 'quasar';
import { LoginUseCase } from '@modules/auth/domain/useCases';
import { useRouter } from 'vue-router';
import { getNotifyDefaultOptions } from 'app/src/common/helpers/notify-default-options.helper';

const { t } = useI18n()
const $q = useQuasar();
const $router = useRouter();

const formRef = ref<QForm | null>(null);
const loading = ref<boolean>(false);
const isPwd = ref<boolean>(true);

const formAuth = reactive({
  emailOrPhone: '',
  password: ''
});

const validate = LoginUseCase.validateAt;

const handleLogin = async () => {
  loading.value = true;

  await formRef.value.validate();

  try {
    await LoginUseCase.handle(formAuth);
    await $router.push('/dashboard');
    $q.notify({
      ...getNotifyDefaultOptions('success'),
      message: 'Inicio de sesión exitoso.'
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

  loading.value = false;

};

</script>
