import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopProductDetailRoutingModule } from './shop-product-detail-routing.module';
import { PageShopProductDetailHomeComponent } from './pages/page-shop-product-detail-home/page-shop-product-detail-home.component';
import { SharedModule } from '@shared/shared.module';

/* Components */
import * as components from './components';

@NgModule({
  declarations: [PageShopProductDetailHomeComponent, ...components.components],
  imports: [CommonModule, ShopProductDetailRoutingModule, SharedModule],
})
export class ShopProductDetailModule {}
