import type { PiniaGetters } from './types';
import type { State } from './types';

const getters: PiniaGetters = {
  GetRole: (state: State) => {
    return state.role;
  },
};

export default getters;
