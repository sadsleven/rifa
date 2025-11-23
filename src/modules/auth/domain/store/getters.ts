import type { PiniaGetters, State } from './types';

const getters: PiniaGetters = {
  GetToken: (state: State) => {
    return state.raToken;
  },
  GetUser: (state: State) => {
    return state.raUser;
  },
};

export default getters;
