//import { Item } from './item.model';

export interface Attribute {
  id: string;
  name: string;
  type: string;
  //products: Item[];
  attribute_values: Attribute_values[];
}

export interface Attribute_values {
  value: string;
  color: string;
  checked: boolean;
}
