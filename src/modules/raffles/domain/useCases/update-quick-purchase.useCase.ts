import { RaffleGateway } from '@modules/raffles/infrastructure/gateways/raffle.gateway';
import { useAuthStore } from '@modules/auth/domain/store';
import type { IRaffleQuickPurchase } from '@modules/raffles/infrastructure/interfaces/raffle.interface';

export class UpdateQuickPurchaseUseCase {
  static async handle(raffleId: number, quickPurchaseId: number, data: IRaffleQuickPurchase) {
    const authStore = useAuthStore();
    const token = authStore.GetToken;

    return await RaffleGateway.updateQuickPurchase(raffleId, quickPurchaseId, data, token, authStore);
  }
}
