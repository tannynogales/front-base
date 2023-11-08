import { Pagination } from '@core/models';

export interface Customer {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CustomrsObject {
  data: Customer[];
  loading: boolean;
  // meta: {
  //   pagination: Pagination;
  // };
}
