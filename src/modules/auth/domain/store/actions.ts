import { PiniaActions } from './types';
import { useRouter } from 'vue-router';

const router = useRouter();

const actions: PiniaActions = {
  setUser(value) {
    this.raUser = value;
    localStorage.setItem('raUser', JSON.stringify(value));
  },
  updateUserFiled(field, value): void {
    this.raUser[field] = value;
  },
  setToken(value) {
    this.raToken = value;
    localStorage.setItem('raToken', value);
  },
  logout() {
    this.raUser = null;
    this.raToken = null;
    localStorage.removeItem('raUser');
    localStorage.removeItem('raToken');
    router.push('/');
  },
};

export default actions;
