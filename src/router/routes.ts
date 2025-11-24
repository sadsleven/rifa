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
      {
        path: '/admins',
        component: () =>
          import('@modules/admin/presentation/pages/AdminPage.vue'),
      },
      {
        path: '/admins/create',
        component: () =>
          import('@modules/admin/presentation/pages/CreateAdminPage.vue'),
      },
      {
        path: '/admins/edit/:id',
        component: () =>
          import('@modules/admin/presentation/pages/EditAdminPage.vue'),
      },
      {
        path: '/banks',
        component: () =>
          import('@modules/bank/presentation/pages/BankPage.vue'),
      },
      {
        path: '/banks/create',
        component: () =>
          import('@modules/bank/presentation/pages/CreateBankPage.vue'),
      },
      {
        path: '/banks/edit/:id',
        component: () =>
          import('@modules/bank/presentation/pages/EditBankPage.vue'),
      },
      {
        path: '/banks/:dbs/users',
        component: () =>
          import('@modules/user/presentation/pages/UserPage.vue'),
      },
      {
        path: '/banks/:dbs/raffles',
        component: () =>
          import('@modules/raffles/presentation/pages/RafflePage.vue'),
      },
      {
        path: '/banks/:dbs/raffles/create',
        component: () =>
          import('@modules/raffles/presentation/pages/CreateRafflePage.vue'),
      },
      {
        path: '/banks/:dbs/raffles/edit/:id',
        component: () =>
          import('@modules/raffles/presentation/pages/EditRafflePage.vue'),
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
