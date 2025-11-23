import configuration from '@config/configuration';
import authRoutes from '@modules/auth/infrastructure/routes';
import { PiniaStore } from '@modules/auth/domain/store/types';
import { tokenExpired } from '@common/utils/token-expired';
export const refreshTokenAndRetry =  (store: PiniaStore) =>
{
  return async({ error, config, http }) =>
  {
    if (tokenExpired(error))
    {
      const response =  await http.post(`${configuration().server.basePath}/${authRoutes.refreshToken.url}`);
      const _token: string = response.data.data.token as string;

      config.headers.Authorization = `Bearer ${_token}`;

      store.setToken(_token);
    }
  };
};
