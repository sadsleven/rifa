<template>
  <div>
    <q-form
      class="self-end flex column wp-100 hp-60-vh"
      ref="formRef"
      greedy
      @submit="handleUploadUser"
    >
      <div class="row">
        <div class="col-12 q-pa-md">
          <span style="font-size: clamp(1rem, 3vw, 0.6rem)">
          {{ 'Username (Correo electrónico)' }}
          </span>
          <q-input
            outlined
            color="app-primary"
            v-model.trim="formUser.email"
            type="email"
            ref="emailInp"
            placeholder="Ej. ohidalgo126@gmail.com"
            class="mt-4"
            :rules="[
              validate('email')
            ]"
          />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span style="font-size: clamp(1rem, 3vw, 0.6rem)">
          {{ 'Nombre' }}
          </span>
          <q-input
            outlined
            color="app-primary"
            v-model.trim="formUser.firstName"
            type="text"
            ref="firstNameInp"
            placeholder="Ej. Oswaldo"
            class="mt-4"
            :rules="[
              validate('firstName')
            ]"
          />
        </div>

        <div class="col-12 col-md-6 q-pa-md">
          <span style="font-size: clamp(1rem, 3vw, 0.6rem)">
          {{ 'Apellido' }}
          </span>
          <q-input
            outlined
            color="app-primary"
            v-model.trim="formUser.lastName"
            type="text"
            ref="lastNameInp"
            placeholder="Ej. Hidalgo"
            class="mt-4"
            :rules="[
              validate('lastName')
            ]"
          />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span style="font-size: clamp(1rem, 3vw, 0.6rem)">
          {{ 'Teléfono' }}
          </span>
          <q-input
            outlined
            color="app-primary"
            v-model.trim="formUser.phone"
            type="tel"
            ref="phoneInp"
            placeholder="Ej. 412 190 5322"
            class="mt-4"
            :rules="[
              validate('phone')
            ]"
          />
        </div>
        <div class="col-12 col-md-6 q-pa-md">
          <span style="font-size: clamp(1rem, 3vw, 0.6rem)">
          {{ 'Género' }}
          </span>
          <q-select
            outlined
            color="app-primary"
            v-model.trim="formUser.gender"
            type="tel"
            emit-value
            map-options
            :options="[
              { label: 'Masculino', value: 'male' },
              { label: 'Femenino', value: 'female' },
              { label: 'Otro', value: 'other' },
            ]"
            ref="genderInp"
            placeholder="Seleccionar"
            class="mt-4"
            :rules="[
              validate('gender')
            ]"
          />
        </div>
      </div>
      <div class="full-width flex justify-between">
        <q-btn
          no-caps
          unelevated
          flat
          color="app-secondary"
          class="py-14 text-white br-8"
          @click="$router.back()"
          :disable="loading"
        >
        <span>
          {{ 'Cancelar' }}
        </span>
        </q-btn>
        <q-btn
          no-caps
          unelevated
          :disable="loading"
          :loading="loading"
          color="app-primary"
          class="py-14 text-white br-8"
          type="submit"
        >
        <span>
          {{ `${ !isUpdate ? 'Registrar' : 'Editar'} usuario` }}
        </span>
        </q-btn>
      </div>

    </q-form>
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { QForm } from 'quasar';
import { CreateUserUseCase, EditUserUseCase } from '@modules/users/domain/useCases';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@modules/users/domain/store';

export default {
  props: {
    isUpdate: {
      type: Boolean,
      default: false
    }
  },
  setup(props)
  {
    // CONSTANTS
    const $router = useRouter();
    const validate = CreateUserUseCase.validateAt;
    const usersStore = useUsersStore();

    // REFS
    const formRef = ref<QForm | null>(null);
    const loading = ref<boolean>(false);

    // REACTIVE
    const formUser = reactive({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: ''
    });


    // FUNCTIONS
    const handleUploadUser = async() =>
    {
      loading.value = true;

      void await formRef.value.validate();

      if (!props.isUpdate)
      {
        try
        {
          await CreateUserUseCase.handle(formUser);
          await $router.push('/users');
        }
        catch (e)
        { }
      }
      else
      {
        try
        {
          await EditUserUseCase.handle({ ...formUser, _id: usersStore.GetUser._id });
          await $router.push('/users');
        }
        catch (e)
        { }
      }

      loading.value = false;
    };

    // LIFECYCLE HOOKS
    onMounted(() =>
    {
      if (props.isUpdate)
      {
        formUser.firstName = usersStore.GetUser.firstName;
        formUser.lastName = usersStore.GetUser.lastName;
        formUser.phone = usersStore.GetUser.phone;
        formUser.gender = usersStore.GetUser.gender;
        formUser.email = usersStore.GetUser.email;
      }
    });

    // RETURN TO COMPONENT
    return {
      handleUploadUser,
      formUser,
      validate,
      formRef,
      loading
    };
  }
};
</script>

authStore.setToken(result.data.data.token);
