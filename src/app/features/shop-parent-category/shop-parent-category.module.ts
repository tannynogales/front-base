import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopParentCategoryRoutingModule } from './shop-parent-category-routing.module';
import { ShopParentCategoryHomeComponent } from './pages/shop-parent-category-home/shop-parent-category-home.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ShopParentCategoryHomeComponent],
  imports: [CommonModule, ShopParentCategoryRoutingModule, SharedModule],
})
export class ShopParentCategoryModule {}
