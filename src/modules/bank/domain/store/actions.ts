import type { PiniaActions } from './types';

const actions: PiniaActions = {
  setBank(value) {
    this.bank = value;
  },
};

export default actions;
