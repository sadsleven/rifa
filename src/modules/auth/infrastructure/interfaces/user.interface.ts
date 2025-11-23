import type { IBaseEntity } from '@common/interfaces';

export interface IUser extends IBaseEntity {
  name: string;
  email: string;
  phone: string;
  enabled: boolean;
  isSuperAdmin: boolean;
  permissions: [];
  roles: [];
}
