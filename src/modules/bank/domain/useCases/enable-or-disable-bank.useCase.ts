import {
  axiosCatchError,
  defaultCatchError,
  zodCatchError,
} from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { BankGateway } from '@modules/bank/infrastructure/gateways/bank.gateway';
import { useAuthStore } from '@modules/auth/domain/store';

export class EnableOrDisableBankUseCase {
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(id: number, enable: boolean) {
    const authStore = useAuthStore();

    if (enable) {
      return await BankGateway.enableBank(
        id,
        authStore.GetToken,
        authStore
      );
    } else {
      return await BankGateway.disableBank(
        id,
        authStore.GetToken,
        authStore
      );
    }
  }
}
