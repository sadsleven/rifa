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
import { AdminGateway } from '@modules/admin/infrastructure/gateways/admin.gateway';
import { useAuthStore } from '@modules/auth/domain/store';
import type { IAdminSchema } from '@modules/admin/presentation/schemas';
import { AdminSchema } from '@modules/admin/presentation/schemas';

export class CreateAdminUseCase {
  static validateAt(property: keyof Partial<IAdminSchema>) {
    return validationAt(AdminSchema)(property);
  }

  static async validate(data: IAdminSchema) {
    return await AdminSchema.parseAsync(data);
  }

  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(data: IAdminSchema) {
    const authStore = useAuthStore();

    const result = await AdminGateway.createAdmin(
      data,
      authStore.GetToken,
      authStore
    );
    return result;
  }
}
