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
  // Billing
  billing_type: string;
  billing_rut: string;
  billing_name: string;
  billing_giro: string;
  billing_direccion: string;
  billing_comuna: string;
  billing_comuna_name: string;
  billing_email: string;
  billing_telefono: string;
}

export interface ShoppingCartsObject {
  data: ShoppingCart[];
  loading: boolean;
  meta: {
    pagination: Pagination;
  };
}
