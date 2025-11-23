import { IAPIResponse } from '@common/interfaces';
import { IUser } from '@modules/auth/infrastructure/interfaces/user.interface';


export interface ILoginResponse  extends IAPIResponse<{
  user: IUser;
  expires: number,
  token: string;
}> {}
