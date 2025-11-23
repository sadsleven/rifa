import type { IRoleSchemaEdit } from '@modules/roles/presentation/schemas';
import { RoleSchema } from '@modules/roles/presentation/schemas';
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
import { RolesGateway } from '@modules/roles/infrastructure/gateways/roles.gateway';
import { useAuthStore } from '@modules/auth/domain/store';

export class EditRoleUseCase {
  static validateAt(property: keyof Partial<IRoleSchemaEdit>) {
    return validationAt(RoleSchema)(property);
  }

  static async validate(data: IRoleSchemaEdit) {
    return await RoleSchema.parseAsync(data);
  }

  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(
    data: IRoleSchemaEdit,
    id: number,
    admin: boolean = true
  ) {
    const authStore = useAuthStore();

    const result = await RolesGateway.editRole(
      data,
      id,
      authStore.GetToken,
      authStore,
      admin
    );
    return result;
  }
}
