import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminShoppingCartsRoutingModule } from './admin-shopping-carts-routing.module';
import { ShoppingCartsHomeComponent } from './pages/shopping-carts-home/shopping-carts-home.component';
import { ShoppingCartDetailComponent } from './pages/shopping-cart-detail/shopping-cart-detail.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ShoppingCartsHomeComponent, ShoppingCartDetailComponent],
  imports: [CommonModule, AdminShoppingCartsRoutingModule, SharedModule],
})
export class AdminShoppingCartsModule {}
