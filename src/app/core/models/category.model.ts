import { Item } from './item.model';

export interface Category {
  id: number;
  name: string;
  slug: string;
  // productsQuantity: number;
  image?: string;
  // TODO hacer parent_categories oblogaotior y arreglar lo que se rompa
  parent_categories?: Array<string>; // array of slugs
}

export interface CategoryObject {
  data: Category[];
  loading: boolean;
}
