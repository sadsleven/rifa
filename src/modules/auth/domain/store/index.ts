import { defineStore } from 'pinia';
import '@app/plugins/piniaPersist/core/types';
import state from './state';
import getters from './getters';
import actions from './actions';

export const useAuthStore = defineStore('auth', {
  state,
  getters,
  actions,
  persist: true,
});

export type AuthStore = typeof useAuthStore;
