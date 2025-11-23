import { IBaseEntity } from '@common/interfaces';

export interface IRole extends IBaseEntity {
  id: number;
  name: string;
  description: string | null;
  permissions: string[];
  createdAt?: number;
  updatedAt?: null | number;
  deletedAt?: null | number;
}
