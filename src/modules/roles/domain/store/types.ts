import type { Store } from 'pinia';
import type { PiniaActionAdaptor, PiniaGetterAdaptor } from '@stores/types';
import type { IRole } from '@modules/roles/infrastructure/interfaces/role.interface';

export type State = { role: IRole };

export type Getters = { GetRole: IRole };

export type Actions = { setRole: (value: IRole) => void };

export type PiniaStore = Store<'users', State, Getters, Actions>;

export type PiniaActions = PiniaActionAdaptor<Actions, PiniaStore>;

export type PiniaGetters = PiniaGetterAdaptor<Getters, PiniaStore>;
