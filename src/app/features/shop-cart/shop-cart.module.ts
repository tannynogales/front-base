import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopCartRoutingModule } from './shop-cart-routing.module';
import { ShopCartHomeComponent } from './pages/shop-cart-home/shop-cart-home.component';


@NgModule({
  declarations: [
    ShopCartHomeComponent
  ],
  imports: [
    CommonModule,
    ShopCartRoutingModule
  ]
})
export class ShopCartModule { }
