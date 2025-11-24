import { z } from 'zod';

export interface IRafflePlaceSchema {
  place: number;
  rewardsYes: string;
  type: string;
  amount: number;
  lotteryAt: string;
  description: string;
  imgUrls: string[];
}

export interface IRaffleQuickPurchaseSchema {
  minTickets: number;
  discountPercentage: number;
}

export interface IRaffleSchema {
  title: string;
  description: string;
  mainImgUrl: string;
  imgUrls: string[];
  startDate: string;
  endDate: string;
  ticketDigits: number;
  ticketPrice: number;
  currency: string;
  assignmentType: string;
  places: IRafflePlaceSchema[];
  quickPurchases: IRaffleQuickPurchaseSchema[];
}

export const RafflePlaceSchema = z.object({
  place: z.number(),
  rewardsYes: z.string(),
  type: z.string(),
  amount: z.number(),
  lotteryAt: z.string(),
  description: z.string(),
  imgUrls: z.array(z.string()).min(1, {
    message: 'Debe agregar al menos una imagen para el premio',
  }),
});

export const RaffleQuickPurchaseSchema = z.object({
  minTickets: z.number(),
  discountPercentage: z.number(),
});

export const RaffleSchema = z.object({
  title: z.string().min(1, {
    message: 'El título es requerido',
  }),
  description: z.string().min(1, {
    message: 'La descripción es requerida',
  }),
  mainImgUrl: z.string().min(1, {
    message: 'La URL de la imagen principal es requerida',
  }),
  imgUrls: z.array(z.string()),
  startDate: z.string().min(1, {
    message: 'La fecha de inicio es requerida',
  }),
  endDate: z.string().min(1, {
    message: 'La fecha de fin es requerida',
  }),
  ticketDigits: z.number().min(1, {
    message: 'Los dígitos del ticket son requeridos',
  }),
  ticketPrice: z.number().min(0, {
    message: 'El precio del ticket es requerido',
  }),
  currency: z.string().min(1, {
    message: 'La moneda es requerida',
  }),
  assignmentType: z.string(),
  places: z.array(RafflePlaceSchema).min(1, {
    message: 'Debe agregar al menos un lugar',
  }),
  quickPurchases: z.array(RaffleQuickPurchaseSchema).min(6, {
    message: 'Debe agregar al menos 6 opciones de compra rápida',
  }),
});
