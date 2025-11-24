export interface IRafflePlaceReward {
  name: string;
  description: string;
  imgUrls: string[];
}

export interface IRafflePlace {
  id?: number;
  type?: string;
  amount?: number;
  rewardsYes: string;
  place: number;
  description: string | null;
  lotteryAt?: string;
  imgUrls?: string[];
  rewards?: IRafflePlaceReward[];
  status?: string;
  winningTicketNumber?: string | null;
  numberOfWinners?: number | null;
}

export interface IRaffleQuickPurchase {
  minTickets: number;
  discountPercentage: number;
}

export interface IRaffle {
  id: number;
  nanoId: string;
  title: string;
  slug: string;
  description: string;
  status: string;
  mainImgUrl: string | null;
  imgUrls: string[];
  startDate: string;
  endDate: string;
  ticketDigits: number;
  ticketAvailable: number;
  totalTicketsSold?: number | null;
  currency: string;
  ticketPrice: number;
  places?: IRafflePlace[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IRaffleSchema {
  title: string;
  description: string;
  mainImgUrl?: string | null;
  imgUrls?: string[];
  startDate: string;
  endDate: string;
  ticketDigits: number;
  ticketPrice: number;
  currency: string;
  assignmentType?: string;
  places: IRafflePlace[];
  quickPurchases?: IRaffleQuickPurchase[];
}

export interface IRaffleSchemaEdit {
  title?: string;
  description?: string;
  mainImgUrl?: string | null;
  imgUrls?: string[];
  startDate?: string;
  endDate?: string;
  ticketDigits?: number;
  ticketPrice?: number;
  currency?: string;
  places?: IRafflePlace[];
  quickPurchases?: IRaffleQuickPurchase[];
}
