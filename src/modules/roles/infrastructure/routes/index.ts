import type { AxiosRequestConfig } from 'axios';

const rolesRoutes = {
  getRoles: {
    url: 'admin/roles',
    method: 'GET',
  },
  getPermissions: {
    url: 'admin/permissions',
    method: 'GET',
  },
  getRoleBySlug: {
    url: (slug: string) => `admin/roles/${slug}`,
    method: 'GET',
  },
  createRole: {
    url: 'admin/roles',
    method: 'POST',
  },
  updateRole: {
    url: (id: number) => `admin/roles/${id}`,
    method: 'PATCH',
  },
  updateRolePermissions: {
    url: (id: number) => `admin/roles/${id}/permissions`,
    method: 'PATCH',
  },
  enableRole: {
    url: (id: number) => `admin/roles/${id}/enabled`,
    method: 'PATCH',
  },
  disableRole: {
    url: (id: number) => `admin/roles/${id}/disabled`,
    method: 'PATCH',
  },
  restoreRole: {
    url: (id: number) => `admin/roles/${id}/restore`,
    method: 'PATCH',
  },
  deleteRoleSoft: {
    url: (id: number) => `admin/roles/${id}/soft`,
    method: 'DELETE',
  },
  deleteRoleHard: {
    url: (id: number) => `admin/roles/${id}/hard`,
    method: 'DELETE',
  },
  getRolesOwner: {
    url: 'owner/roles',
    method: 'GET',
  },
  getPermissionsOwner: {
    url: 'owner/permissions',
    method: 'GET',
  },
  getRoleBySlugOwner: {
    url: (slug: string) => `owner/roles/${slug}`,
    method: 'GET',
  },
  createRoleOwner: {
    url: 'owner/roles',
    method: 'POST',
  },
  updateRoleOwner: {
    url: (id: number) => `owner/roles/${id}`,
    method: 'PATCH',
  },
  updateRolePermissionsOwner: {
    url: (id: number) => `owner/roles/${id}/permissions`,
    method: 'PATCH',
  },
  enableRoleOwner: {
    url: (id: number) => `owner/roles/${id}/enabled`,
    method: 'PATCH',
  },
  disableRoleOwner: {
    url: (id: number) => `owner/roles/${id}/disabled`,
    method: 'PATCH',
  },
  restoreRoleOwner: {
    url: (id: number) => `owner/roles/${id}/restore`,
    method: 'PATCH',
  },
  deleteRoleSoftOwner: {
    url: (id: number) => `owner/roles/${id}/soft`,
    method: 'DELETE',
  },
  deleteRoleHardOwner: {
    url: (id: number) => `owner/roles/${id}/hard`,
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

export default rolesRoutes;
