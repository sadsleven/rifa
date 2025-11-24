import type { PiniaActions } from './types';

const actions: PiniaActions = {
  setRaffle(value) {
    this.raffle = value;
  },
};

export default actions;
