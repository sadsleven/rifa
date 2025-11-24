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
import { BankGateway } from '@modules/bank/infrastructure/gateways/bank.gateway';
import { useAuthStore } from '@modules/auth/domain/store';
import type { IBankSchema, IOwnerSchema } from '@modules/bank/presentation/schemas';
import { BankSchema, OwnerSchema } from '@modules/bank/presentation/schemas';

export class CreateBankUseCase {
  static validateAt(property: keyof Partial<IBankSchema>) {
    return validationAt(BankSchema)(property);
  }

  static validateOwnerAt(property: keyof Partial<IOwnerSchema>) {
    return validationAt(OwnerSchema)(property);
  }

  static async validate(data: IBankSchema) {
    return await BankSchema.parseAsync(data);
  }

  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(data: IBankSchema) {
    const authStore = useAuthStore();

    const result = await BankGateway.createBank(
      data,
      authStore.GetToken,
      authStore
    );
    return result;
  }
}
