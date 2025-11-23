import { IUserSchema, UserSchema } from '@modules/users/presentation/schemas';
import { axiosCatchError, defaultCatchError, validationAt, zodCatchError } from '@common/utils';
import { AxiosError } from 'axios';
import { Catch } from '@common/decorators/catch.decorator';
import { DefaultCatch } from '@common/decorators/default-catch.decorator';
import { ZodError } from 'zod';
import { UsersGateway } from '@modules/users/infrastructure/gateways/users.gateway';
import { useAuthStore } from '@modules/auth/domain/store';

export class EditUserUseCase
{
  static validateAt(property: keyof Partial<IUserSchema>)
  {
    return validationAt(UserSchema)(property);
  }

  static async validate(data: IUserSchema)
  {
    return await UserSchema.parseAsync(data);
  }

  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(data: IUserSchema)
  {
    const authStore = useAuthStore();

    const result  = await UsersGateway.editUser(data, authStore.GetToken, authStore);
    return result;
  }
}
