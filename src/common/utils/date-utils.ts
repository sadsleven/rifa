import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/es';

export const formatDate = (date: Date | string, newFormat?: string, oldFormat?: string) =>
{
  dayjs.extend(localizedFormat);
  return dayjs(date, oldFormat).locale('es').format(newFormat ?? 'LL');
};
