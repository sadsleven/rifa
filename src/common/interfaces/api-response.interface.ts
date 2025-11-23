export interface IAPIResponse<D = any> {
  folio: string;
  status: string;
  timestamp: number;
  data: D;
  pagination?: {
    total: number;
    limit: number;
    criterias: {
      sort: object | null;
      filter: object | null;
    }
  }
}
