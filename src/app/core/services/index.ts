import { UserService } from './user.service';
import { CartProductsService } from './cart-products.service';
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
import { CartUserService } from './cart-user.service';
import { CartBillingService } from './cart-billing.service';
import { UtilitiesChileRegionesService } from './utilities-chile-regiones.service';
import { CartDeliveryService } from './cart-delivery.service';
import { PrivatePagesService } from './private-pages.service';
import { SubscribeService } from './subscribe.service';
import { SiteService } from './site.service';
import { MetaService } from './meta.service';

export const services = [
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
  CartUserService,
  CartProductsService,
  CartDeliveryService,
  CartBillingService,
  UtilitiesChileRegionesService,
  PrivatePagesService,
  SubscribeService,
  SiteService,
  MetaService,
];

export * from './cart-products.service';
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
export * from './cart-user.service';
export * from './utilities-chile-regiones.service';
export * from './cart-delivery.service';
export * from './cart-billing.service';
export * from './private-pages.service';
export * from './subscribe.service';
export * from './site.service';
export * from './meta.service';
