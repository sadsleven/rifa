import type { IUser } from '../interfaces/user.interface';
import { HTTP } from '@common/services';
import type { AxiosRequestConfig } from 'axios';
import userRoutes, { setBasePath } from '@modules/user/infrastructure/routes';
import configuration from '@config/configuration';
import { tokenExpired } from '@common/utils';
import type { PiniaStore } from '@modules/auth/domain/store/types';
import { refreshTokenAndRetry } from '@modules/auth/infrastructure/utils';

export class UserGateway {
  private static readonly routes = userRoutes;
  private static readonly basePath = configuration().server.basePath;

  static async getUsers(
    dbs: string,
    token: string,
    store: PiniaStore,
    query: string = ''
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.getUsers.url(dbs),
          method: this.routes.getUsers.method,
        },
        this.basePath,
        query
      ),
    };

    return HTTP.request<{ data: IUser[] }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }
}
