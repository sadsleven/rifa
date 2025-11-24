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

export class DeleteAdminUseCase {
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(id: number) {
    const authStore = useAuthStore();

    const result = await AdminGateway.deleteAdmin(
      id,
      authStore.GetToken,
      authStore
    );
    return result;
  }
}
