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
    url: (id: number) => `owner/raffles/${id}/tickets`,
    method: 'GET',
  },
  getTopTen: {
    url: (id: number) => `owner/raffles/${id}/top-ten`,
    method: 'GET',
  },
  getTicketsAdmin: {
    url: (dbs: string, id: number) =>
      `admin/banks/${dbs}/raffles/${id}/tickets`,
    method: 'GET',
  },
  getTopTenAdmin: {
    url: (dbs: string, id: number) =>
      `admin/banks/${dbs}/raffles/${id}/top-ten`,
    method: 'GET',
  },
  processResults: {
    url: (id: number) => `owner/raffles/${id}/process-results`,
    method: 'PATCH',
  },
  cancelAndRefund: {
    url: (id: number) => `owner/raffles/${id}/cancel-and-refound`,
    method: 'PATCH',
  },
  toPublish: {
    url: (id: number) => `owner/raffles/${id}/to-publish`,
    method: 'PATCH',
  },
  toDraft: {
    url: (id: number) => `owner/raffles/${id}/to-draft`,
    method: 'PATCH',
  },
  updateQuickPurchaseOwner: {
    url: (id: number, quickPurchaseId: number) =>
      `owner/raffles/${id}/quick-purchases/${quickPurchaseId}`,
    method: 'PUT',
  },
  addPlaceOwner: {
    url: (id: number) => `owner/raffles/${id}/places`,
    method: 'POST',
  },
  updatePlaceOwner: {
    url: (id: number, placeId: number) =>
      `owner/raffles/${id}/places/${placeId}`,
    method: 'PUT',
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
