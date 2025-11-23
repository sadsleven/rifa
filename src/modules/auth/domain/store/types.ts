import { Store } from 'pinia';
import { PiniaActionAdaptor, PiniaGetterAdaptor } from '@stores/types';
import { IUser } from '@modules/auth/infrastructure/interfaces/user.interface';

export type State = {
  raToken: string | null;
  raUser: IUser | null;
};

export type Getters = {
  GetToken: string | null;
  GetUser: IUser | null;
};

export type Actions = {
  setToken: (value: string | null) => void;
  setUser: (value: any) => void;
  updateUserFiled: (field: string, val: any) => void;
  logout: () => void;
};

export type PiniaStore = Store<'auth', State, Getters, Actions>;

export type PiniaActions = PiniaActionAdaptor<Actions, PiniaStore>;

export type PiniaGetters = PiniaGetterAdaptor<Getters, PiniaStore>;
