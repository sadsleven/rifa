import type { State } from './types';

const state = (): State => {
  return {
    raToken: localStorage.getItem('raToken') || null,
    raUser: localStorage.getItem('raUser')
      ? JSON.parse(localStorage.getItem('raUser'))
      : null,
  };
};

export default state;
