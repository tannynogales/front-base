import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopHomeRoutingModule } from './shop-home-routing.module';

/* Pages */
import * as shopHomePages from './pages';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [...shopHomePages.pages],
  imports: [CommonModule, ShopHomeRoutingModule, SharedModule],
})
export class ShopHomeModule {}
