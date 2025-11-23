import { CatchErrorFactory } from '@common/factories';
import type { Handler } from '@common/factories';

export const Catch = (errorClassConstructor: any, handler: Handler) =>
  CatchErrorFactory(errorClassConstructor, handler);
