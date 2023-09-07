import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopHomeRoutingModule } from './shop-home-routing.module';

/* Pages */
import * as shopHomePages from './pages';

import { SharedModule } from '@shared/shared.module';
// import { ProductsService } from './../../layout/layout-shop/services/products.service';

@NgModule({
  // providers: [ProductsService],
  declarations: [...shopHomePages.pages],
  imports: [CommonModule, ShopHomeRoutingModule, SharedModule],
})
export class ShopHomeModule {}
