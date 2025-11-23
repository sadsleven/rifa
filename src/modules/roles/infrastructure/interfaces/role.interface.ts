import type { IBaseEntity } from '@common/interfaces';

export interface IRole extends IBaseEntity {
  name: string;
  description: string | null;
  permissions: string[];
}
