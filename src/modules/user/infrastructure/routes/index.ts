import type { AxiosRequestConfig } from 'axios';

const userRoutes = {
  getUsers: {
    url: (dbs: string) => `admin/banks/${dbs}/users`,
    method: 'GET',
  },
  getUserById: {
    url: (dbs: string, id: number) => `admin/banks/${dbs}/users/${id}`,
    method: 'GET',
  },
};

export type Route = Pick<AxiosRequestConfig, 'url' | 'method'>;
export const setBasePath = (
  route: Route,
  basePath: string,
  query?: string
): Route => {
  return {
    ...route,
    url: `${basePath}/${route.url}${query ?? ''}`,
  };
};

export default userRoutes;
