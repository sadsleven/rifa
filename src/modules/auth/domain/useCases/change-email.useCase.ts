import { AuthGateway } from '@modules/auth/infrastructure/gateways/auth.gateway';
import { useAuthStore } from '@modules/auth/domain/store';
import {
  requestEmailChangeSchema,
  confirmEmailChangeSchema,
  type IRequestEmailChangeSchema,
  type IConfirmEmailChangeSchema
} from '@modules/auth/presentation/schemas';
import { validationAt } from '@common/utils';

export class ChangeEmailUseCase {
  static validateAtRequest(property: keyof Partial<IRequestEmailChangeSchema>) {
    return validationAt(requestEmailChangeSchema)(property);
  }

  static validateAtConfirm(property: keyof Partial<IConfirmEmailChangeSchema>) {
    return validationAt(confirmEmailChangeSchema)(property);
  }

  static async requestChange(data: { email: string }) {
    const authStore = useAuthStore();
    const token = authStore.GetToken;

    if (!token) {
      throw new Error('No token found');
    }

    const response = await AuthGateway.requestEmailChange(data, token, authStore);
    return response;
  }

  static async confirmChange(data: { email: string; code: string }) {
    const authStore = useAuthStore();
    const token = authStore.GetToken;

    if (!token) {
      throw new Error('No token found');
    }

    const response = await AuthGateway.confirmEmailChange(data, token, authStore);
    
    // Update user email in store after successful change
    if (response?.data) {
      authStore.updateUserFiled('email', data.email);
    }
    
    return response;
  }
}
