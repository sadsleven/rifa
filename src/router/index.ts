import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { useAuthStore } from '@modules/auth/domain/store'; // Asegúrate de ajustar la ruta según tu estructura de archivos

import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.GetToken && authStore.GetToken !== '';

    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
      if (!isAuthenticated) {
        // Redirect to login page if not authenticated
        if (to.path !== '/') {
          next({ path: '/' });
        } else {
          next();
        }
      } else {
        next();
      }
    } else {
      // Prevent infinite redirection loop
      if (to.path === '/' && isAuthenticated) {
        next({ path: '/dashboard' });
      } else {
        next();
      }
    }
  });

  return Router;
});
