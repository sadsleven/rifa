import { AuthGateway } from '@modules/auth/infrastructure/gateways/auth.gateway';
import { useAuthStore } from '@modules/auth/domain/store';
import {
  requestPhoneChangeSchema,
  confirmPhoneChangeSchema,
  type IRequestPhoneChangeSchema,
  type IConfirmPhoneChangeSchema
} from '@modules/auth/presentation/schemas';
import { validationAt } from '@common/utils';

export class ChangePhoneUseCase {
  static validateAtRequest(property: keyof Partial<IRequestPhoneChangeSchema>) {
    return validationAt(requestPhoneChangeSchema)(property);
  }

  static validateAtConfirm(property: keyof Partial<IConfirmPhoneChangeSchema>) {
    return validationAt(confirmPhoneChangeSchema)(property);
  }

  static async requestChange(data: { phone: string }) {
    const authStore = useAuthStore();
    const token = authStore.GetToken;

    if (!token) {
      throw new Error('No token found');
    }

    const response = await AuthGateway.requestPhoneChange(data, token, authStore);
    return response;
  }

  static async confirmChange(data: { phone: string; code: string }) {
    const authStore = useAuthStore();
    const token = authStore.GetToken;

    if (!token) {
      throw new Error('No token found');
    }

    const response = await AuthGateway.confirmPhoneChange(data, token, authStore);
    
    // Update user phone in store after successful change
    if (response?.data) {
      authStore.updateUserFiled('phone', data.phone);
    }
    
    return response;
  }
}
