import type { PiniaGetters } from './types';
import type { State } from './types';

const getters: PiniaGetters = {
  GetUser: (state: State) => {
    return state.user;
  },
};

export default getters;
