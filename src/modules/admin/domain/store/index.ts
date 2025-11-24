import { defineStore } from 'pinia';
import state from './state';
import getters from './getters';
import actions from './actions';

export const useAdminStore = defineStore('admin', {
  state,
  getters,
  actions,
});

export type AdminStore = typeof useAdminStore;
