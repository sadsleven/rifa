import type { AxiosRequestConfig } from 'axios';

const authRoutes = {
  login: {
    url: 'auth/admin/login',
    method: 'POST',
  },
  refreshToken: {
    url: 'auth/admin/refresh-token',
    method: 'POST',
  },
  logout: {
    url: 'auth/admin/logout',
    method: 'PUT',
  },
  me: {
    url: 'auth/admin/me',
    method: 'GET',
  },
  meOwner: {
    url: 'auth/owner/me',
    method: 'GET',
  },
  changePassword: {
    url: 'auth/admin/me/change-password',
    method: 'PATCH',
  },
  changePasswordOwner: {
    url: 'auth/owner/me/change-password',
    method: 'PATCH',
  },
  requestEmailChange: {
    url: 'auth/admin/me/change-email',
    method: 'PUT',
  },
  requestEmailChangeOwner: {
    url: 'auth/owner/me/change-email',
    method: 'PUT',
  },
  confirmEmailChange: {
    url: 'auth/admin/me/change-email',
    method: 'PATCH',
  },
  confirmEmailChangeOwner: {
    url: 'auth/owner/me/change-email',
    method: 'PATCH',
  },
  requestPhoneChange: {
    url: 'auth/admin/me/change-phone',
    method: 'PUT',
  },
  requestPhoneChangeOwner: {
    url: 'auth/owner/me/change-phone',
    method: 'PUT',
  },
  confirmPhoneChange: {
    url: 'auth/admin/me/change-phone',
    method: 'PATCH',
  },
  confirmPhoneChangeOwner: {
    url: 'auth/owner/me/change-phone',
    method: 'PATCH',
  },
};

export type Route = Pick<AxiosRequestConfig, 'url' | 'method'>;
export const setBasePath = (route: Route, basePath: string): Route => {
  return {
    ...route,
    url: `${basePath}/${route.url}`,
  };
};

export default authRoutes;
