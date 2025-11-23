import { HTTP } from '@common/services';
import type { AxiosRequestConfig } from 'axios';
import rolesRoutes, { setBasePath } from '@modules/roles/infrastructure/routes';
import configuration from '@config/configuration';
import { tokenExpired } from '@common/utils';
import type { PiniaStore } from '@modules/auth/domain/store/types';
import { refreshTokenAndRetry } from '@modules/auth/infrastructure/utils';

export class PermissionsGateway {
  private static readonly routes = rolesRoutes;
  private static readonly basePath = configuration().server.basePath;

  static async getPermissions(
    token: string,
    store: PiniaStore,
    admin: boolean = true
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        admin ? this.routes.getPermissions : this.routes.getPermissionsOwner,
        this.basePath
      ),
    };

    return HTTP.request<{ data: { message: string; messageCode: string } }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }
}
