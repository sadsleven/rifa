import { IRoleSchema } from '@modules/roles/presentation/schemas';
import { HTTP } from '@common/services';
import { AxiosRequestConfig } from 'axios';
import rolesRoutes, { setBasePath } from '@modules/roles/infrastructure/routes';
import configuration from '@config/configuration';
import { tokenExpired } from '@common/utils';
import { PiniaStore } from '@modules/auth/domain/store/types';
import { refreshTokenAndRetry } from '@modules/auth/infrastructure/utils';
import { IRole } from '../interfaces/role.interface';

export class RolesGateway {
  private static readonly routes = rolesRoutes;
  private static readonly basePath = configuration().server.basePath;

  static async getRoles(token: string, store: PiniaStore) {
    const options: AxiosRequestConfig = {
      ...setBasePath(this.routes.getRoles, this.basePath),
    };

    return HTTP.request<{ data: { message: string; messageCode: string } }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }

  static async createRole(data: IRoleSchema, token: string, store: PiniaStore) {
    const options: AxiosRequestConfig = {
      ...setBasePath(this.routes.createRole, this.basePath),
      data,
    };

    return HTTP.request<{ data: { message: string; messageCode: string } }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }

  static async updateRole(data: IRole, token: string, store: PiniaStore) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.updateRole.url(data.id),
          method: this.routes.updateRole.method,
        },
        this.basePath
      ),
      data,
    };

    return HTTP.request<{ data: { message: string; messageCode: string } }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }

  static async deleteRole(id: number, token: string, store: PiniaStore) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.deleteRoleSoft.url(id),
          method: this.routes.deleteRoleSoft.method,
        },
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
