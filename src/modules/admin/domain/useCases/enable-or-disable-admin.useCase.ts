import {
  axiosCatchError,
  defaultCatchError,
  zodCatchError,
} from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { AdminGateway } from '@modules/admin/infrastructure/gateways/admin.gateway';
import { useAuthStore } from '@modules/auth/domain/store';

export class EnableOrDisableAdminUseCase {
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(id: number, enable: boolean) {
    const authStore = useAuthStore();

    if (enable) {
      return await AdminGateway.enableAdmin(
        id,
        authStore.GetToken,
        authStore
      );
    } else {
      return await AdminGateway.disableAdmin(
        id,
        authStore.GetToken,
        authStore
      );
    }
  }
}
