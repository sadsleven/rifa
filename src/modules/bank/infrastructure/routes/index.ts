import type { AxiosRequestConfig } from 'axios';

const bankRoutes = {
  getBanks: {
    url: 'admin/banks',
    method: 'GET',
  },
  getBankBySlug: {
    url: (slug: string) => `admin/banks/${slug}`,
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
  enableBank: {
    url: (id: number) => `admin/banks/${id}/enabled`,
    method: 'PATCH',
  },
  disableBank: {
    url: (id: number) => `admin/banks/${id}/disabled`,
    method: 'PATCH',
  },
  getOwnBank: {
    url: 'owner/bank',
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

export default bankRoutes;
