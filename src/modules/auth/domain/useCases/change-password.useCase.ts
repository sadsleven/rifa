import { AuthGateway } from '@modules/auth/infrastructure/gateways/auth.gateway';
import { useAuthStore } from '@modules/auth/domain/store';
import { changePasswordSchema, type IChangePasswordSchema } from '@modules/auth/presentation/schemas';
import { validationAt } from '@common/utils';

export class ChangePasswordUseCase {
  static validateAt(property: keyof Partial<IChangePasswordSchema>) {
    return validationAt(changePasswordSchema)(property);
  }

  static async handle(data: { currentPassword: string; password: string; confirmPassword: string }) {
    const authStore = useAuthStore();
    const token = authStore.GetToken;

    if (!token) {
      throw new Error('No token found');
    }

    const response = await AuthGateway.changePassword(data, token, authStore);
    return response;
  }
}
