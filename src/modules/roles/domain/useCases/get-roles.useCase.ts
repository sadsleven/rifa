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

export class GetRolesUseCase {
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(query: string, admin: boolean = true) {
    const authStore = useAuthStore();

    const result = await RolesGateway.getRoles(
      authStore.GetToken,
      authStore,
      query,
      admin
    );
    return result;
  }
}
