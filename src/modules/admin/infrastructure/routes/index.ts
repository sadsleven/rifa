import type { AxiosRequestConfig } from 'axios';

const adminRoutes = {
  getAdmins: {
    url: 'admin/admins',
    method: 'GET',
  },
  getAdminById: {
    url: (id: number) => `admin/admins/${id}`,
    method: 'GET',
  },
  createAdmin: {
    url: 'admin/admins',
    method: 'POST',
  },
  updateAdmin: {
    url: (id: number) => `admin/admins/${id}`,
    method: 'PATCH',
  },
  deleteAdmin: {
    url: (id: number) => `admin/admins/${id}/soft`,
    method: 'DELETE',
  },
  updateAdminRoles: {
    url: (id: number) => `admin/admins/${id}/roles`,
    method: 'PATCH',
  },
  enableAdmin: {
    url: (id: number) => `admin/admins/${id}/enabled`,
    method: 'PATCH',
  },
  disableAdmin: {
    url: (id: number) => `admin/admins/${id}/disabled`,
    method: 'PATCH',
  },
  getAdminsOwner: {
    url: 'owner/admins',
    method: 'GET',
  },
  getAdminByIdOwner: {
    url: (id: number) => `owner/admins/${id}`,
    method: 'GET',
  },
  createAdminOwner: {
    url: 'owner/admins',
    method: 'POST',
  },
  updateAdminOwner: {
    url: (id: number) => `owner/admins/${id}`,
    method: 'PATCH',
  },
  deleteAdminOwner: {
    url: (id: number) => `owner/admins/${id}/soft`,
    method: 'DELETE',
  },
  updateAdminRolesOwner: {
    url: (id: number) => `owner/admins/${id}/roles`,
    method: 'PATCH',
  },
  enableAdminOwner: {
    url: (id: number) => `owner/admins/${id}/enabled`,
    method: 'PATCH',
  },
  disableAdminOwner: {
    url: (id: number) => `owner/admins/${id}/disabled`,
    method: 'PATCH',
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

export default adminRoutes;
