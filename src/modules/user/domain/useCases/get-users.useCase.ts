import {
  axiosCatchError,
  defaultCatchError,
  zodCatchError,
} from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { UserGateway } from '@modules/user/infrastructure/gateways/user.gateway';
import { useAuthStore } from '@modules/auth/domain/store';

export class GetUsersUseCase {
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(dbs: string, query: string = '') {
    const authStore = useAuthStore();

    const result = await UserGateway.getUsers(
      dbs,
      authStore.GetToken,
      authStore,
      query
    );
    return result;
  }
}
