import { ProductsService } from './products.service';
import { CategoriesService } from './categories.service';
import { ParentCategoriesService } from './parent-categories.service';
import { SelectedParentCategoryService } from './selected-parent-category.service';
import { ProductService } from './product.service';

export const services = [
  ProductService,
  ProductsService,
  ParentCategoriesService,
  CategoriesService,
  SelectedParentCategoryService,
];

export * from './products.service';
export * from './product.service';
export * from './categories.service';
export * from './parent-categories.service';
export * from './selected-parent-category.service';
