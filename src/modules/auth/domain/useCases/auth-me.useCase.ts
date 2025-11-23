import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { AuthGateway } from '@modules/auth/infrastructure/gateways/auth.gateway';
import { useAuthStore } from '@modules/auth/domain/store';
import { axiosCatchError, defaultCatchError } from '@common/utils';

export class AuthMeUseCase {
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  static async handle() {
    const authStore = useAuthStore();

    const result = await AuthGateway.authMe(
      authStore.GetToken,
      authStore
    ).catch((r) => r);

    authStore.setUser(result.data.data);
  }
}
