import type { Store } from 'pinia';
import type { PiniaActionAdaptor, PiniaGetterAdaptor } from '@stores/types';
import type { IAdmin } from '@modules/admin/infrastructure/interfaces/admin.interface';

export type State = { admin: IAdmin | null };

export type Getters = { GetAdmin: IAdmin | null };

export type Actions = { setAdmin: (value: IAdmin | null) => void };

export type PiniaStore = Store<'admin', State, Getters, Actions>;

export type PiniaActions = PiniaActionAdaptor<Actions, PiniaStore>;

export type PiniaGetters = PiniaGetterAdaptor<Getters, PiniaStore>;
