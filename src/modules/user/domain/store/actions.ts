import type { PiniaActions } from './types';

const actions: PiniaActions = {
  setUser(value) {
    this.user = value;
  },
};

export default actions;
