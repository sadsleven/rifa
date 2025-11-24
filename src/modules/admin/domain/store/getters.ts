import type { PiniaGetters } from './types';
import type { State } from './types';

const getters: PiniaGetters = {
  GetAdmin: (state: State) => {
    return state.admin;
  },
};

export default getters;
