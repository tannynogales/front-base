import { CustomersService } from './customers.service';
import { ShoppingCartsService } from './shopping-carts.service';

export const services = [CustomersService, ShoppingCartsService];

export * from './customers.service';
export * from './shopping-carts.service';
