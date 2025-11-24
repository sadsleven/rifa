import {
  axiosCatchError,
  defaultCatchError,
  validationAt,
  zodCatchError,
} from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { RaffleGateway } from '@modules/raffles/infrastructure/gateways/raffle.gateway';
import { useAuthStore } from '@modules/auth/domain/store';
import type { IRaffleSchema, IRafflePlaceSchema, IRaffleQuickPurchaseSchema } from '@modules/raffles/presentation/schemas';
import { RaffleSchema, RafflePlaceSchema, RaffleQuickPurchaseSchema } from '@modules/raffles/presentation/schemas';

export class CreateRaffleUseCase {
  static validateAt(property: keyof Partial<IRaffleSchema>) {
    return validationAt(RaffleSchema)(property);
  }

  static validatePlaceAt(property: keyof Partial<IRafflePlaceSchema>) {
    return validationAt(RafflePlaceSchema)(property);
  }

  static validateQuickPurchaseAt(property: keyof Partial<IRaffleQuickPurchaseSchema>) {
    return validationAt(RaffleQuickPurchaseSchema)(property);
  }

  static async validate(data: IRaffleSchema) {
    return await RaffleSchema.parseAsync(data);
  }

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
