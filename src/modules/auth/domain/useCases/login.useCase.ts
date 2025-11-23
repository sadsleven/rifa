import { ILoginSchema, LoginSchema } from '@modules/auth/presentation/schemas';
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
import { AuthGateway } from '@modules/auth/infrastructure/gateways/auth.gateway';
import { useAuthStore } from '@modules/auth/domain/store';

export class LoginUseCase {
  static validateAt(property: keyof Partial<ILoginSchema>) {
    return validationAt(LoginSchema)(property);
  }

  static async validate(data: ILoginSchema) {
    return await LoginSchema.parseAsync(data);
  }

  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(data: ILoginSchema) {
    const _data = (await this.validate(data)) as ILoginSchema;

    const result = await AuthGateway.logIn(_data);

    const authStore = useAuthStore();

    authStore.setToken(result.data.data.token);
    authStore.setUser(result.data.data.user);

    return result;
  }
}
