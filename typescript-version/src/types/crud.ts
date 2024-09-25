export interface crudResponse<T>{
  limit: number;
  page: number;
  results: Array<T>;
  totalPages: number;
  totalResults: number;
}
