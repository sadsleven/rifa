import {
  axiosCatchError,
  defaultCatchError,
  zodCatchError,
} from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { RaffleGateway } from '@modules/raffles/infrastructure/gateways/raffle.gateway';
import { useAuthStore } from '@modules/auth/domain/store';
import type { IRaffleSchema } from '@modules/raffles/infrastructure/interfaces/raffle.interface';

export class CreateRaffleUseCase {
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(dbs: string, data: IRaffleSchema) {
    const authStore = useAuthStore();

    const result = await RaffleGateway.createRaffle(
      dbs,
      data,
      authStore.GetToken,
      authStore
    );
    return result;
  }
}
