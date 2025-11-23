import { CatchErrorFactory } from '@common/factories';
import type { Handler } from '@common/factories';

export const DefaultCatch = (handler: Handler) => CatchErrorFactory(handler);
