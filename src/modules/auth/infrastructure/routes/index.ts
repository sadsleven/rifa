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
};

export type Route = Pick<AxiosRequestConfig, 'url' | 'method'>;
export const setBasePath = (route: Route, basePath: string): Route => {
  return {
    ...route,
    url: `${basePath}/${route.url}`,
  };
};

export default authRoutes;
