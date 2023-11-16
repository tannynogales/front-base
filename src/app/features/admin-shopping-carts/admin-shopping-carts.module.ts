import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminShoppingCartsRoutingModule } from './admin-shopping-carts-routing.module';
import { ShoppingCartsHomeComponent } from './pages/shopping-carts-home/shopping-carts-home.component';
import { ShoppingCartDetailComponent } from './pages/shopping-cart-detail/shopping-cart-detail.component';


@NgModule({
  declarations: [
    ShoppingCartsHomeComponent,
    ShoppingCartDetailComponent
  ],
  imports: [
    CommonModule,
    AdminShoppingCartsRoutingModule
  ]
})
export class AdminShoppingCartsModule { }
