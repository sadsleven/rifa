import type { Router } from 'vue-router';

export async function persistFiltersInRouteHelper(
  router: Router,
  route: string,
  filters: any[],
  offset: number,
  limit: number,
  name?: string,
) {
  await router.replace({
    path: route,
    query: {
      filters: filters.toString(),
      offset,
      limit,
      name,
    },
  });
}
