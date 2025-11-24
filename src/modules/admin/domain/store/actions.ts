import type { PiniaActions } from './types';

const actions: PiniaActions = {
  setAdmin(value) {
    this.admin = value;
  },
};

export default actions;
