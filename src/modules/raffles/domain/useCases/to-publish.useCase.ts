import { RaffleGateway } from '@modules/raffles/infrastructure/gateways/raffle.gateway';
import { useAuthStore } from '@modules/auth/domain/store';

export class ToPublishUseCase {
  static async handle(id: number) {
    const authStore = useAuthStore();
    const token = authStore.GetToken;

    return await RaffleGateway.toPublish(id, token, authStore);
  }
}
