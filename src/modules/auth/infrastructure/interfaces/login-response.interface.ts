import type { IAPIResponse } from '@common/interfaces';
import type { IUser } from '@modules/auth/infrastructure/interfaces/user.interface';

export type ILoginResponse = IAPIResponse<{
  user: IUser;
  expires: number;
  token: string;
}>;
