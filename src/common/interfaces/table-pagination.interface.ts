export interface ITablePagination {
  sortBy: 'desc' | 'asc';
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber: number;
  offset: number;
}
