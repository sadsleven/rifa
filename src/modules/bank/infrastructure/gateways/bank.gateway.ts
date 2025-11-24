import type {
  IBank,
  IBankSchema,
  IBankSchemaEdit,
} from '../interfaces/bank.interface';
import { HTTP } from '@common/services';
import type { AxiosRequestConfig } from 'axios';
import bankRoutes, { setBasePath } from '@modules/bank/infrastructure/routes';
import configuration from '@config/configuration';
import { tokenExpired } from '@common/utils';
import type { PiniaStore } from '@modules/auth/domain/store/types';
import { refreshTokenAndRetry } from '@modules/auth/infrastructure/utils';

export class BankGateway {
  private static readonly routes = bankRoutes;
  private static readonly basePath = configuration().server.basePath;

  static async getBanks(
    token: string,
    store: PiniaStore,
    query: string = ''
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        this.routes.getBanks,
        this.basePath,
        query
      ),
    };

    return HTTP.request<{ data: IBank[] }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }

  static async createBank(
    data: IBankSchema,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        this.routes.createBank,
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

  static async editBank(
    data: IBankSchemaEdit,
    id: number,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.updateBank.url(id),
          method: this.routes.updateBank.method,
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

  static async deleteBank(
    id: number,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.deleteBank.url(id),
          method: this.routes.deleteBank.method,
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
