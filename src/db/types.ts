export interface SequelizeReturning<T> {
  dataValues: T;
}

export interface SequelizeRowsAndCount<T> {
  rows: SequelizeReturning<T>[];
  count: number;
}

export interface PaginatedResult<T> {
  rows: T[];
  totalRecords: number;
}
