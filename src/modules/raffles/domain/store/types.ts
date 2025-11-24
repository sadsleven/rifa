import type { Store } from 'pinia';
import type { PiniaActionAdaptor, PiniaGetterAdaptor } from '@stores/types';
import type { IRaffle } from '@modules/raffles/infrastructure/interfaces/raffle.interface';

export type State = { raffle: IRaffle | null };

export type Getters = { GetRaffle: IRaffle | null };

export type Actions = { setRaffle: (value: IRaffle | null) => void };

export type PiniaStore = Store<'raffle', State, Getters, Actions>;

export type PiniaActions = PiniaActionAdaptor<Actions, PiniaStore>;

export type PiniaGetters = PiniaGetterAdaptor<Getters, PiniaStore>;
