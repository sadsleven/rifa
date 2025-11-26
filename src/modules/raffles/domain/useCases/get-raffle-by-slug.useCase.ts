import { RaffleGateway } from '@modules/raffles/infrastructure/gateways/raffle.gateway';
import { useAuthStore } from '@modules/auth/domain/store';

export class GetRaffleBySlugUseCase {
  static async handle(slug: string, dbs?: string) {
    const authStore = useAuthStore();
    const token = authStore.GetToken;

    return await RaffleGateway.getRaffleBySlug(slug, token, authStore, dbs);
  }
}
