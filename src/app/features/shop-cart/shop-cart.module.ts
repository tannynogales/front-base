import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopCartRoutingModule } from './shop-cart-routing.module';
import { ShopCartHomeComponent } from './pages/shop-cart-home/shop-cart-home.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ShopCartHomeComponent],
  imports: [CommonModule, ShopCartRoutingModule, SharedModule],
})
export class ShopCartModule {}
