import { IAPIResponse } from '@common/interfaces';
import { IUser } from '@modules/auth/infrastructure/interfaces/user.interface';

export interface IAuthMeResponse
  extends IAPIResponse<{
    user: IUser;
  }> {}
