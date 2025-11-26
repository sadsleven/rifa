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
        path: '/dashboard',
        component: () =>
          import('@modules/auth/presentation/pages/HomePage.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/profile',
    component: () => import('@common/layouts/MainLayout.vue'),
    children: [
      {
        path: '/profile',
        component: () =>
          import('@modules/auth/presentation/pages/ProfilePage.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/roles',
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
    path: '/admins',
    component: () => import('@common/layouts/MainLayout.vue'),
    children: [
      {
        path: '/admins',
        component: () =>
          import('@modules/admin/presentation/pages/AdminPage.vue'),
      },
      {
        path: '/admins/owners',
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
    ],
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/banks',
    component: () => import('@common/layouts/MainLayout.vue'),
    children: [
      {
        path: '/banks',
        component: () =>
          import('@modules/bank/presentation/pages/BankPage.vue'),
      },
      {
        path: '/banks/self',
        component: () =>
          import('@modules/bank/presentation/pages/BankSelfPage.vue'),
      },
      {
        path: '/banks/create',
        component: () =>
          import('@modules/bank/presentation/pages/CreateBankPage.vue'),
      },
      {
        path: '/banks/edit/:slug',
        component: () =>
          import('@modules/bank/presentation/pages/EditBankPage.vue'),
      },
      {
        path: '/banks/info/:slug',
        component: () =>
          import('@modules/bank/presentation/pages/BankInfoPage.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/raffles',
    component: () => import('@common/layouts/MainLayout.vue'),
    children: [
      {
        path: '/raffles',
        component: () =>
          import('@modules/raffles/presentation/pages/RafflePage.vue'),
      },
      {
        path: '/raffles/create',
        component: () =>
          import('@modules/raffles/presentation/pages/CreateRafflePage.vue'),
      },
      {
        path: '/raffles/edit/:slug',
        component: () =>
          import('@modules/raffles/presentation/pages/EditRafflePage.vue'),
      },
      {
        path: '/raffles/info/:slug',
        component: () =>
          import('@modules/raffles/presentation/pages/RaffleInfoPage.vue'),
      },
      {
        path: '/raffles/info/:slug/:dbs',
        component: () =>
          import('@modules/raffles/presentation/pages/RaffleInfoPage.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('@common/pages/ErrorNotFound.vue'),
  },
];

export default routes;
