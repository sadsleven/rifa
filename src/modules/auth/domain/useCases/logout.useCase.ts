import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { AuthGateway } from '@modules/auth/infrastructure/gateways/auth.gateway';
import { useAuthStore } from '@modules/auth/domain/store';
import { axiosCatchError, defaultCatchError } from '@common/utils';

export class LogoutUseCase {
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  static async handle() {
    const authStore = useAuthStore();

    await AuthGateway.logOut(authStore.GetToken, authStore).catch((r) => r);

    authStore.logout();
  }
}
