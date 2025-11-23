// @ts-nocheck

import type { ZodError } from 'zod';

export const zodCatchError = (err: ZodError) => {
  return err.errors.reduce((p, c) => {
    return {
      ...p,
      [c.path[0]]: c.message,
    };
  }, {});
};
