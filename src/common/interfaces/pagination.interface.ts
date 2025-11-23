export interface IPagination {
  total: number;
  offset: number;
  limit: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  from: number;
  to: number;
  path: string | null;
  firstUrl: string | null;
  lastUrl: string | null;
  nextUrl: string | null;
  prevUrl: string | null;
  currentUrl: string | null;
}
