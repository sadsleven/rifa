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

export class GetBankBySlugUseCase {
  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(slug: string) {
    const authStore = useAuthStore();

    const result = await BankGateway.getBankBySlug(
      slug,
      authStore.GetToken,
      authStore
    );
    return result;
  }
}
