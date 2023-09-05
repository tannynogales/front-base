import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopProductListRoutingModule } from './shop-product-list-routing.module';
import { PageShopProductListHomeComponent } from './pages/page-shop-product-list-home/page-shop-product-list-home.component';
import { SharedModule } from '@shared/shared.module';
import { ShopProductListFiltersComponent } from './components/shop-product-list-filters/shop-product-list-filters.component';

@NgModule({
  declarations: [PageShopProductListHomeComponent, ShopProductListFiltersComponent],
  imports: [CommonModule, ShopProductListRoutingModule, SharedModule],
})
export class ShopProductListModule {}
