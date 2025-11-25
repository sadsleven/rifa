import { RaffleGateway } from '@modules/raffles/infrastructure/gateways/raffle.gateway';
import { useAuthStore } from '@modules/auth/domain/store';
import type { IRafflePlace } from '@modules/raffles/infrastructure/interfaces/raffle.interface';

export class AddPlaceUseCase {
  static async handle(raffleId: number, data: IRafflePlace) {
    const authStore = useAuthStore();
    const token = authStore.GetToken;

    return await RaffleGateway.addPlace(raffleId, data, token, authStore);
  }
}
