import {
  axiosCatchError,
  defaultCatchError,
  zodCatchError,
} from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { PermissionsGateway } from '@modules/roles/infrastructure/gateways/permissions.gateway';
import { useAuthStore } from '@modules/auth/domain/store';

export class GetPermissionsUseCase {
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(admin: boolean = true) {
    const authStore = useAuthStore();

    const result = await PermissionsGateway.getPermissions(
      authStore.GetToken,
      authStore,
      admin
    );
    return result;
  }
}
