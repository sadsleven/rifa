import type { AxiosRequestConfig } from 'axios';

export interface IPaginationParams {
  limit: string | null;
  offset: string | null;
}

export interface IQueryParams {
  filter?: URLSearchParams | object;
  pagination?: IPaginationParams;
  limit?: string | null;
  offset?: string | null;
  sort?: object;
}

export interface IHttpServiceParams<u = any> {
  config: AxiosRequestConfig;
  queryParams?: IQueryParams;
  user?: u | null;
  token?: string | null;
  headers?: object;
  retries?: number;
}
