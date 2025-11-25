import { RaffleGateway } from '@modules/raffles/infrastructure/gateways/raffle.gateway';
import { useAuthStore } from '@modules/auth/domain/store';

export class ToDraftUseCase {
  static async handle(id: number) {
    const authStore = useAuthStore();
    const token = authStore.GetToken;

    return await RaffleGateway.toDraft(id, token, authStore);
  }
}
