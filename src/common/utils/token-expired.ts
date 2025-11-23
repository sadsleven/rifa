// @ts-nocheck
/* eslint-disable */

import type { AxiosError } from 'axios';
export const tokenExpired = (error: AxiosError | any): boolean => {
  return (
    error.response.status === 403 && error.response.data.message === 'exceptions.auth.expiredToken'
  );
};
