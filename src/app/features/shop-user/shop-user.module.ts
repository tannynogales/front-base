import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopUserRoutingModule } from './shop-user-routing.module';
import { ShopUserHomeComponent } from './pages/shop-user-home/shop-user-home.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ShopUserHomeComponent],
  imports: [CommonModule, ShopUserRoutingModule, SharedModule],
})
export class ShopUserModule {}
