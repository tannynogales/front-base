import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminShoppingCartsRoutingModule } from './admin-shopping-carts-routing.module';
import { ShoppingCartsHomeComponent } from './pages/shopping-carts-home/shopping-carts-home.component';


@NgModule({
  declarations: [
    ShoppingCartsHomeComponent
  ],
  imports: [
    CommonModule,
    AdminShoppingCartsRoutingModule
  ]
})
export class AdminShoppingCartsModule { }
