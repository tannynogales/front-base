import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopPageHomeComponent } from './pages/shop-page-home/shop-page-home.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ShopPageHomeComponent],
  imports: [CommonModule, ShopRoutingModule, SharedModule],
  exports: [],
})
export class ShopModule {}
