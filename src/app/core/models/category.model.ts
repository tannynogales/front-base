import { Item } from './item.model';

export interface Category {
  id: number;
  name: string;
  slug: string;
  // productsQuantity: number;
  image?: string;
}

export interface CategoryObject {
  data: Category[];
  loading: boolean;
}
