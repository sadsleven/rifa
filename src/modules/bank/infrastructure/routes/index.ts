import type { AxiosRequestConfig } from 'axios';

const bankRoutes = {
  getBanks: {
    url: 'admin/banks',
    method: 'GET',
  },
  getBankById: {
    url: (id: number) => `admin/banks/${id}`,
    method: 'GET',
  },
  createBank: {
    url: 'admin/banks',
    method: 'POST',
  },
  updateBank: {
    url: (id: number) => `admin/banks/${id}`,
    method: 'PATCH',
  },
  deleteBank: {
    url: (id: number) => `admin/banks/${id}`,
    method: 'DELETE',
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

export default bankRoutes;
