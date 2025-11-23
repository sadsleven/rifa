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
          import('@modules/roles/presentation/pages/RolesPage.vue'),
      },
      {
        path: '/roles/create',
        component: () =>
          import('@modules/roles/presentation/pages/CreateRole.vue'),
      },
      {
        path: '/roles/edit',
        component: () =>
          import('@modules/roles/presentation/pages/EditRole.vue'),
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
