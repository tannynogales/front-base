import { CustomersService } from './customers.service';
import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCartProductsService } from './shopping-cart-products.service';

export const services = [
  CustomersService,
  ShoppingCartsService,
  ShoppingCartProductsService,
];

export * from './customers.service';
export * from './shopping-carts.service';
export * from './shopping-cart-products.service';
