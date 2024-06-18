export interface IFilterOptions {
  orderBy?: string;
  order?: 'ASC' | 'DESC';
  filters?: string[];
  values?: any[];
}

export interface IPaginationOptions {
  page?: number;
  pageSize?: number;
}

export interface IPaginationData {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface IPaginatedResult<T> {
  data: T[];
  pagination: IPaginationData;
}
