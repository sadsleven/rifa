import type {
  IRoleSchema,
  IRoleSchemaEdit,
  IRoleSchemaPermissionsEdit,
} from '@modules/roles/presentation/schemas';
import { HTTP } from '@common/services';
import type { AxiosRequestConfig } from 'axios';
import rolesRoutes, { setBasePath } from '@modules/roles/infrastructure/routes';
import configuration from '@config/configuration';
import { tokenExpired } from '@common/utils';
import type { PiniaStore } from '@modules/auth/domain/store/types';
import { refreshTokenAndRetry } from '@modules/auth/infrastructure/utils';
import type { IRole } from '../interfaces/role.interface';

export class RolesGateway {
  private static readonly routes = rolesRoutes;
  private static readonly basePath = configuration().server.basePath;

  static async getRoles(
    token: string,
    store: PiniaStore,
    query: string,
    admin: boolean = true
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        admin ? this.routes.getRoles : this.routes.getRolesOwner,
        this.basePath,
        query
      ),
    };

    return HTTP.request<{ data: IRole[] }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }

  static async createRole(
    data: IRoleSchema,
    token: string,
    store: PiniaStore,
    admin: boolean = true
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        admin ? this.routes.createRole : this.routes.createRoleOwner,
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

  static async editRole(
    data: IRoleSchemaEdit,
    id: number,
    token: string,
    store: PiniaStore,
    admin: boolean = true
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: admin
            ? this.routes.updateRole.url(id)
            : this.routes.updateRoleOwner.url(id),
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

  static async editRolePermissions(
    data: IRoleSchemaPermissionsEdit,
    id: number,
    token: string,
    store: PiniaStore,
    admin: boolean = true
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: admin
            ? this.routes.updateRolePermissions.url(id)
            : this.routes.updateRolePermissionsOwner.url(id),
          method: this.routes.updateRolePermissions.method,
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

  static async getRoleBySlug(
    slug: string,
    token: string,
    store: PiniaStore,
    admin: boolean = true
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: admin
            ? this.routes.getRoleBySlug.url(slug)
            : this.routes.getRoleBySlugOwner.url(slug),
          method: this.routes.getRoleBySlug.method,
        },
        this.basePath
      ),
    };

    return HTTP.request<{ data: IRole }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }

  static async deleteRole(
    id: number,
    token: string,
    store: PiniaStore,
    admin: boolean = true
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: admin
            ? this.routes.deleteRoleSoft.url(id)
            : this.routes.deleteRoleSoftOwner.url(id),
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


  static async enableRole(
    id: number,
    token: string,
    store: PiniaStore,
    admin: boolean = true
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: admin
            ? this.routes.enableRole.url(id)
            : this.routes.enableRoleOwner.url(id),
          method: this.routes.enableRole.method,
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

  static async disableRole(
    id: number,
    token: string,
    store: PiniaStore,
    admin: boolean = true
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: admin
            ? this.routes.disableRole.url(id)
            : this.routes.disableRoleOwner.url(id),
          method: this.routes.disableRole.method,
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
