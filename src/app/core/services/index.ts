import { ProductsService } from './products.service';
import { CategoriesService } from './categories.service';
import { ProductService } from './product.service';

export const services = [ProductsService, CategoriesService];

export * from './products.service';
export * from './product.service';
export * from './categories.service';
