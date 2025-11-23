import type { IRoleSchemaPermissionsEdit } from '@modules/roles/presentation/schemas';
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

export class EditRolePermissionsUseCase {
  static validateAt(property: keyof Partial<IRoleSchemaPermissionsEdit>) {
    return validationAt(RoleSchema)(property);
  }

  static async validate(data: IRoleSchemaPermissionsEdit) {
    return await RoleSchema.parseAsync(data);
  }

  @DefaultCatch(defaultCatchError)
  @Catch(AxiosError, axiosCatchError)
  @Catch(ZodError, zodCatchError)
  static async handle(
    data: IRoleSchemaPermissionsEdit,
    id: number,
    admin: boolean = true
  ) {
    const authStore = useAuthStore();

    const result = await RolesGateway.editRolePermissions(
      data,
      id,
      authStore.GetToken,
      authStore,
      admin
    );
    return result;
  }
}
