import { IBaseEntity } from '@common/interfaces';

export interface IUser extends IBaseEntity {
  id: number;
  name: string;
  email: string;
  phone: string;
  enabled: boolean;
  isSuperAdmin: boolean;
  permissions: [];
  roles: [];
  createdAt: number;
  updatedAt: null | number;
  deletedAt: null | number;
}
