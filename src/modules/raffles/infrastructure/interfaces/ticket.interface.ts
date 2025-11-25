export interface ITicket {
  id: number;
  number: string;
  status: string;
  price: number;
  buyer?: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  purchaseDate?: number;
  createdAt: number;
  updatedAt: number;
}
