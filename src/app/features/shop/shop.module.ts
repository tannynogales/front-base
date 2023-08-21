import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopPageHomeComponent } from './pages/shop-page-home/shop-page-home.component';

import { SharedModule } from '@shared/shared.module';
import { ShopProductCategoryComponent } from './pages/shop-product-category/shop-product-category.component';
import { ShopProductCategoryFiltersComponent } from './components/shop-product-category-filters/shop-product-category-filters.component';
import { ShopProductDetailHomeComponent } from './pages/shop-product-detail-home/shop-product-detail-home.component';
import { ShopProductDetailSliderComponent } from './components/shop-product-detail-slider/shop-product-detail-slider.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ShopPageHomeComponent,
    ShopProductCategoryComponent,
    ShopProductCategoryFiltersComponent,
    ShopProductDetailHomeComponent,
    ShopProductDetailSliderComponent,
  ],
  imports: [CommonModule, ShopRoutingModule, SharedModule, FormsModule],
  exports: [],
})
export class ShopModule {}
