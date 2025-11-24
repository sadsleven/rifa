import type {
  IAdmin,
  IAdminSchema,
  IAdminSchemaEdit,
} from '../interfaces/admin.interface';
import { HTTP } from '@common/services';
import type { AxiosRequestConfig } from 'axios';
import adminRoutes, { setBasePath } from '@modules/admin/infrastructure/routes';
import configuration from '@config/configuration';
import { tokenExpired } from '@common/utils';
import type { PiniaStore } from '@modules/auth/domain/store/types';
import { refreshTokenAndRetry } from '@modules/auth/infrastructure/utils';

export class AdminGateway {
  private static readonly routes = adminRoutes;
  private static readonly basePath = configuration().server.basePath;

  static async getAdmins(
    token: string,
    store: PiniaStore,
    query: string = ''
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        this.routes.getAdmins,
        this.basePath,
        query
      ),
    };

    return HTTP.request<{ data: IAdmin[] }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }

  static async getAdminById(
    id: number,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.getAdminById.url(id),
          method: this.routes.getAdminById.method,
        },
        this.basePath
      ),
    };

    return HTTP.request<{ data: IAdmin }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }

  static async createAdmin(
    data: IAdminSchema,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        this.routes.createAdmin,
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

  static async editAdmin(
    data: IAdminSchemaEdit,
    id: number,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.updateAdmin.url(id),
          method: this.routes.updateAdmin.method,
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

  static async deleteAdmin(
    id: number,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.deleteAdmin.url(id),
          method: this.routes.deleteAdmin.method,
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

  static async updateAdminRoles(
    roleIds: number[],
    id: number,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.updateAdminRoles.url(id),
          method: this.routes.updateAdminRoles.method,
        },
        this.basePath
      ),
      data: { roleIds },
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
