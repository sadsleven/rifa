import type { Store } from 'pinia';
import type { PiniaActionAdaptor, PiniaGetterAdaptor } from '@stores/types';
import type { IUser } from '@modules/user/infrastructure/interfaces/user.interface';

export type State = { user: IUser | null };

export type Getters = { GetUser: IUser | null };

export type Actions = { setUser: (value: IUser | null) => void };

export type PiniaStore = Store<'user', State, Getters, Actions>;

export type PiniaActions = PiniaActionAdaptor<Actions, PiniaStore>;

export type PiniaGetters = PiniaGetterAdaptor<Getters, PiniaStore>;
