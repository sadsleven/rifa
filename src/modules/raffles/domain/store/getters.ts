import type { PiniaGetters } from './types';
import type { State } from './types';

const getters: PiniaGetters = {
  GetRaffle: (state: State) => {
    return state.raffle;
  },
};

export default getters;
