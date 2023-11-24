import { Item } from './item.model';
import { Seo } from './seo.model';

export interface Category {
  id: number;
  name: string;
  slug: string;
  // productsQuantity: number;
  image?: string;
  highlighted: boolean;
  // TODO hacer parent_categories obligatorio y arreglar lo que se rompa
  parent_categories?: Array<string>; // array of slugs
  seo?: Seo; // TODO ver si este atributo debe ser obligatorio
}

export interface CategoryObject {
  data: Category[];
  loading: boolean;
}
