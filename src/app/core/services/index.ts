import { UserService } from './user.service';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductsService } from './products.service';
import { CategoriesService } from './categories.service';
import { ParentCategoriesService } from './parent-categories.service';
import { SelectedParentCategoryService } from './selected-parent-category.service';
import { ProductService } from './product.service';
import { BannerHomeService } from './banner-home.service';
import { HighlightedHomeProductsService } from './highlighted-home-products.service';
import { ParentCategoryProductsService } from './parent-category-products.service';
import { RememberMeService } from './remember-me.service';
import { AuthService } from './auth.service';

export const services = [
  ShoppingCartService,
  ProductService,
  ProductsService,
  ParentCategoriesService,
  CategoriesService,
  SelectedParentCategoryService,
  BannerHomeService,
  HighlightedHomeProductsService,
  ParentCategoryProductsService,
  UserService,
  RememberMeService,
  AuthService,
];

export * from './shopping-cart.service';
export * from './products.service';
export * from './product.service';
export * from './categories.service';
export * from './parent-categories.service';
export * from './selected-parent-category.service';
export * from './banner-home.service';
export * from './highlighted-home-products.service';
export * from './parent-category-products.service';
export * from './user.service';
export * from './remember-me.service';
export * from './auth.service';
