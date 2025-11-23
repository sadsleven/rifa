import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () =>
      import('@modules/auth/presentation/layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import('@modules/auth/presentation/pages/AuthPage.vue'),
      },
    ],
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/dashboard',
    component: () => import('@common/layouts/MainLayout.vue'),
    children: [
      {
        path: '/roles',
        component: () =>
          import('@modules/roles/presentation/pages/RolesAdminPage.vue'),
      },
      {
        path: '/roles/create',
        component: () =>
          import('@modules/roles/presentation/pages/CreateRoleAdmin.vue'),
      },
      {
        path: '/roles/edit/:name',
        component: () =>
          import('@modules/roles/presentation/pages/EditRoleAdmin.vue'),
      },
      {
        path: '/roles/owners',
        component: () =>
          import('@modules/roles/presentation/pages/RolesOwnerPage.vue'),
      },
      {
        path: '/roles/owners/create',
        component: () =>
          import('@modules/roles/presentation/pages/CreateRoleOwner.vue'),
      },
      {
        path: '/roles/owners/edit/:name',
        component: () =>
          import('@modules/roles/presentation/pages/EditRoleOwner.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/404',
    component: () => import('@common/pages/ErrorNotFound.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@common/pages/ErrorNotFound.vue'),
  },
];

export default routes;
