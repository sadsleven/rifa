// @ts-nocheck
/* eslint-disable */

import type { ZodError, ZodObject } from 'zod';
export const validationAt = <S = any>(schema: ZodObject<S | any>) => {
  return (property: keyof Partial<S>) => {
    return async (value: any) => {
      try {
        await schema.pick({ [property as string]: true }).parseAsync({ [property]: value });
      } catch (e: ZodError | any) {
        return (e as ZodError).issues[0].message;
      }
    };
  };
};
