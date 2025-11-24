import {
  axiosCatchError,
  defaultCatchError,
  zodCatchError,
} from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { RolesGateway } from '@modules/roles/infrastructure/gateways/roles.gateway';
import { useAuthStore } from '@modules/auth/domain/store';

export class EnableOrDisableRoleUseCase {
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(id: number, enable: boolean, admin: boolean = true) {
    const authStore = useAuthStore();

    if (enable) {
      return await RolesGateway.enableRole(
        id,
        authStore.GetToken,
        authStore,
        admin
      );
    } else {
      return await RolesGateway.disableRole(
        id,
        authStore.GetToken,
        authStore,
        admin
      );
    }
  }
}
