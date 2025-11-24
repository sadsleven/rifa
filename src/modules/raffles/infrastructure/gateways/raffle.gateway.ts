import type {
  IRaffle,
  IRaffleSchema,
  IRaffleSchemaEdit,
} from '../interfaces/raffle.interface';
import { HTTP } from '@common/services';
import type { AxiosRequestConfig } from 'axios';
import raffleRoutes, { setBasePath } from '@modules/raffles/infrastructure/routes';
import configuration from '@config/configuration';
import { tokenExpired } from '@common/utils';
import type { PiniaStore } from '@modules/auth/domain/store/types';
import { refreshTokenAndRetry } from '@modules/auth/infrastructure/utils';

export class RaffleGateway {
  private static readonly routes = raffleRoutes;
  private static readonly basePath = configuration().server.basePath;

  static async getRaffles(
    dbs: string,
    token: string,
    store: PiniaStore,
    query: string = ''
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.getRaffles.url(dbs),
          method: this.routes.getRaffles.method,
        },
        this.basePath,
        query
      ),
    };

    return HTTP.request<{ data: IRaffle[] }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }

  static async createRaffle(
    dbs: string,
    data: IRaffleSchema,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.createRaffle.url(dbs),
          method: this.routes.createRaffle.method,
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

  static async editRaffle(
    dbs: string,
    data: IRaffleSchemaEdit,
    id: number,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.updateRaffle.url(dbs, id),
          method: this.routes.updateRaffle.method,
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

  static async deleteRaffle(
    dbs: string,
    id: number,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.deleteRaffle.url(dbs, id),
          method: this.routes.deleteRaffle.method,
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
