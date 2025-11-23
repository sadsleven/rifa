import { defineStore } from 'pinia';
import state from './state';
import getters from './getters';
import actions from './actions';

export const useUsersStore = defineStore('roles', {
  state,
  getters,
  actions,
});

export type UsersStore = typeof useUsersStore;
