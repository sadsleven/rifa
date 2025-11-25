import { RaffleGateway } from '@modules/raffles/infrastructure/gateways/raffle.gateway';
import { useAuthStore } from '@modules/auth/domain/store';

export class CancelAndRefundUseCase {
  static async handle(
    id: number,
    data: { winningTicketNumber: string; placeIds: number[] }
  ) {
    const authStore = useAuthStore();
    const token = authStore.GetToken;

    return await RaffleGateway.cancelAndRefund(id, data, token, authStore);
  }
}
