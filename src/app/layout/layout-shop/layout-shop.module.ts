import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutShopRoutingModule } from './layout-shop-routing.module';
import { SharedModule } from '@shared/shared.module';

// Components
import * as moduleComponents from './components';

/* Services */
import * as moduleServices from './services';

import { LayoutShopComponent } from './layout/layout-shop.component';

@NgModule({
  providers: [...moduleServices.services],
  declarations: [LayoutShopComponent, ...moduleComponents.components],
  imports: [CommonModule, LayoutShopRoutingModule, SharedModule],
})
export class LayoutShopModule {}
