import { AxiosRequestConfig } from 'axios';

const rolesRoutes = {
  getRoles: {
    url: 'admin/roles',
    method: 'GET',
  },
  getPermissions: {
    url: 'admin/permissions',
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
    url: (id: number) => `admin/roles/${id}`,
    method: 'DELETE',
  },
  deleteRoleHard: {
    url: (id: number) => `admin/roles/${id}/hard`,
    method: 'DELETE',
  },
};

export type Route = Pick<AxiosRequestConfig, 'url' | 'method'>;
export const setBasePath = (route: Route, basePath: string): Route => {
  return {
    ...route,
    url: `${basePath}/${route.url}`,
  };
};

export default rolesRoutes;
