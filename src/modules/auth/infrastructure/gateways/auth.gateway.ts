import type { ILoginSchema } from '@modules/auth/presentation/schemas';
import { HTTP } from '@common/services';
import type { AxiosRequestConfig } from 'axios';
import authRoutes, { setBasePath } from '@modules/auth/infrastructure/routes';
import configuration from '@config/configuration';
import type { ILoginResponse } from '@modules/auth/infrastructure/interfaces/login-response.interface';
import { tokenExpired } from '@common/utils';
import type { PiniaStore } from '@modules/auth/domain/store/types';
import { refreshTokenAndRetry } from '@modules/auth/infrastructure/utils';
import type { IUser } from '../interfaces/user.interface';

export class AuthGateway {
  private static readonly routes = authRoutes;
  private static readonly basePath = configuration().server.basePath;

  static async logIn(data: ILoginSchema) {
    const config: AxiosRequestConfig = {
      ...setBasePath(this.routes.login, this.basePath),
      data,
    };
    return HTTP.request<ILoginResponse>({ config });
  }

  static async logOut(token: string, store: PiniaStore) {
    const options: AxiosRequestConfig = {
      ...setBasePath(this.routes.logout, this.basePath),
    };

    return HTTP.request<{ data: { message: string; messageCode: string } }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }

  static async authMe(token: string, store: PiniaStore) {
    const options: AxiosRequestConfig = {
      ...setBasePath(this.routes.me, this.basePath),
    };

    return HTTP.request<{ user: IUser }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }
}
