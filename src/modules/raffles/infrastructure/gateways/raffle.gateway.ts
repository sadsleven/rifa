import type {
  IRaffle,
  IRaffleSchema,
  IRaffleSchemaEdit,
  IRaffleQuickPurchase,
  IRafflePlace,
} from '../interfaces/raffle.interface';
import { HTTP } from '@common/services';
import type { AxiosRequestConfig } from 'axios';
import raffleRoutes, {
  setBasePath,
} from '@modules/raffles/infrastructure/routes';
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

  static async getRafflesOwner(
    token: string,
    store: PiniaStore,
    query: string = ''
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(this.routes.getRafflesOwner, this.basePath, query),
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
    data: IRaffleSchema,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(this.routes.createRaffleOwner, this.basePath),
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
    data: IRaffleSchemaEdit,
    id: number,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.updateRaffleOwner.url(id),
          method: this.routes.updateRaffleOwner.method,
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

  static async deleteRaffle(id: number, token: string, store: PiniaStore) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.deleteRaffleOwner.url(id),
          method: this.routes.deleteRaffleOwner.method,
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

  static async getTickets(
    id: number,
    token: string,
    store: PiniaStore,
    query: string = ''
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.getTickets.url(id),
          method: this.routes.getTickets.method,
        },
        this.basePath,
        query
      ),
    };

    return HTTP.request<{ data: any[] }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }

  static async getRaffleBySlug(
    slug: string,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.getRaffleBySlugOwner.url(slug),
          method: this.routes.getRaffleBySlugOwner.method,
        },
        this.basePath
      ),
    };

    return HTTP.request<{ data: IRaffle }>({
      config: options,
      token,
      retries: 2,
      onCatchError: refreshTokenAndRetry(store),
      retryCondition: tokenExpired,
    });
  }

  static async processResults(
    id: number,
    data: { winningTicketNumber: string; placeIds: number[] },
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.processResults.url(id),
          method: this.routes.processResults.method,
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

  static async cancelAndRefund(
    id: number,
    data: { winningTicketNumber: string; placeIds: number[] },
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.cancelAndRefund.url(id),
          method: this.routes.cancelAndRefund.method,
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

  static async toPublish(id: number, token: string, store: PiniaStore) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.toPublish.url(id),
          method: this.routes.toPublish.method,
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

  static async toDraft(id: number, token: string, store: PiniaStore) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.toDraft.url(id),
          method: this.routes.toDraft.method,
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

  static async updateQuickPurchase(
    raffleId: number,
    quickPurchaseId: number,
    data: IRaffleQuickPurchase,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.updateQuickPurchaseOwner.url(raffleId, quickPurchaseId),
          method: this.routes.updateQuickPurchaseOwner.method,
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

  static async addPlace(
    raffleId: number,
    data: IRafflePlace,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.addPlaceOwner.url(raffleId),
          method: this.routes.addPlaceOwner.method,
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

  static async updatePlace(
    raffleId: number,
    placeId: number,
    data: IRafflePlace,
    token: string,
    store: PiniaStore
  ) {
    const options: AxiosRequestConfig = {
      ...setBasePath(
        {
          url: this.routes.updatePlaceOwner.url(raffleId, placeId),
          method: this.routes.updatePlaceOwner.method,
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
}
