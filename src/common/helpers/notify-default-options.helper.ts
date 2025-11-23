import { DEFAULT_OPTIONS_NOTIFY } from '@common/constants';
import type { NotifyOptionsInterface } from '../interfaces';

export function getNotifyDefaultOptions(
  type: 'success' | 'error' | 'warning'
): NotifyOptionsInterface {
  return {
    ...(DEFAULT_OPTIONS_NOTIFY.defaultOptions as NotifyOptionsInterface),
    ...(DEFAULT_OPTIONS_NOTIFY[type] as NotifyOptionsInterface),
  };
}
