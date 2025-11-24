import type { PiniaGetters } from './types';
import type { State } from './types';

const getters: PiniaGetters = {
  GetBank: (state: State) => {
    return state.bank;
  },
};

export default getters;
