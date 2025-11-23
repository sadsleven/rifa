import { axiosCatchError, defaultCatchError, zodCatchError } from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { UsersGateway } from '@modules/users/infrastructure/gateways/users.gateway';
import { useAuthStore } from '@modules/auth/domain/store';

export class DeleteUserUseCase
{
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(id: string)
  {
    const authStore = useAuthStore();

    const result  = await UsersGateway.deleteUser(id, authStore.GetToken, authStore);
    return result;
  }
}
