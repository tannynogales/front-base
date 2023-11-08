import { Pagination } from '@core/models';

export interface ShoppingCart {
  id: number;
  user_name: string;
  user_email: string;
  user_cellphone: number;
  state: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  delivery_option: string;
  delivery_street_name: string;
  delivery_street_number: string;
  delivery_department: string;
}

export interface ShoppingCartsObject {
  data: ShoppingCart[];
  loading: boolean;
  meta: {
    pagination: Pagination;
  };
}
