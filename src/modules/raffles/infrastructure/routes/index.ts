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
  getRafflesOwner: {
    url: 'owner/raffles',
    method: 'GET',
  },
  getRaffleBySlugOwner: {
    url: (slug: string) => `owner/raffles/${slug}`,
    method: 'GET',
  },
  createRaffleOwner: {
    url: 'owner/raffles',
    method: 'POST',
  },
  updateRaffleOwner: {
    url: (id: number) => `owner/raffles/${id}`,
    method: 'PATCH',
  },
  deleteRaffleOwner: {
    url: (id: number) => `owner/raffles/${id}`,
    method: 'DELETE',
  },
  getTickets: {
    url: (id: number) => `raffles/${id}/tickets`,
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

export default raffleRoutes;
