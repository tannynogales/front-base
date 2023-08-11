import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopLayoutRoutingModule } from './shop-layout-routing.module';
import { ShopLayoutComponent } from './layout/shop-layout/shop-layout.component';
import { ShopLayoutNavbarComponent } from './components/shop-layout-navbar/shop-layout-navbar.component';
import { ShopLayoutFooterComponent } from './components/shop-layout-footer/shop-layout-footer.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    ShopLayoutComponent,
    ShopLayoutNavbarComponent,
    ShopLayoutFooterComponent,
  ],
  imports: [CommonModule, ShopLayoutRoutingModule, SharedModule],
})
export class ShopLayoutModule {}
