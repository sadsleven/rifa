import type { Store } from 'pinia';
import type { PiniaActionAdaptor, PiniaGetterAdaptor } from '@stores/types';
import type { IBank } from '@modules/bank/infrastructure/interfaces/bank.interface';

export type State = { bank: IBank | null };

export type Getters = { GetBank: IBank | null };

export type Actions = { setBank: (value: IBank | null) => void };

export type PiniaStore = Store<'bank', State, Getters, Actions>;

export type PiniaActions = PiniaActionAdaptor<Actions, PiniaStore>;

export type PiniaGetters = PiniaGetterAdaptor<Getters, PiniaStore>;
