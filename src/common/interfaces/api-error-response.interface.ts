export interface IAPIErrorResponse<D = any> {
  folio: string;
  timestamp: Date | string;
  path: string;
  message: string;
  errorCode: string;
  data?: D
}
