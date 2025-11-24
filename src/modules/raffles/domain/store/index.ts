import { defineStore } from 'pinia';
import state from './state';
import getters from './getters';
import actions from './actions';

export const useRaffleStore = defineStore('raffle', {
  state,
  getters,
  actions,
});

export type RaffleStore = typeof useRaffleStore;
