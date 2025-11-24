import type { AxiosRequestConfig } from 'axios';

const raffleRoutes = {
  getRaffles: {
    url: (dbs: string) => `admin/banks/${dbs}/raffles`,
    method: 'GET',
  },
  getRaffleBySlug: {
    url: (dbs: string, slug: string) => `admin/banks/${dbs}/raffles/${slug}`,
    method: 'GET',
  },
  createRaffle: {
    url: (dbs: string) => `admin/banks/${dbs}/raffles`,
    method: 'POST',
  },
  updateRaffle: {
    url: (dbs: string, id: number) => `admin/banks/${dbs}/raffles/${id}`,
    method: 'PATCH',
  },
  deleteRaffle: {
    url: (dbs: string, id: number) => `admin/banks/${dbs}/raffles/${id}`,
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

export default raffleRoutes;
