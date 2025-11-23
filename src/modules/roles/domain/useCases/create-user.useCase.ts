import { IUserSchema, UserSchema } from '@modules/roles/presentation/schemas';
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
import { UsersGateway } from '@modules/roles/infrastructure/gateways/roles.gateway';
import { useAuthStore } from '@modules/auth/domain/store';

export class CreateUserUseCase {
  static validateAt(property: keyof Partial<IUserSchema>) {
    return validationAt(UserSchema)(property);
  }

  static async validate(data: IUserSchema) {
    return await UserSchema.parseAsync(data);
  }

  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(data: IUserSchema) {
    const authStore = useAuthStore();

    data.userName = data.email;

    const result = await UsersGateway.createUser(
      data,
      authStore.GetToken,
      authStore
    );
    return result;
  }
}
