import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopCartHomeComponent } from './pages/shop-cart-home/shop-cart-home.component';
import { ShopCartDeliveryComponent } from './pages/shop-cart-delivery/shop-cart-delivery.component';
import { ShopCartBillingComponent } from './pages/shop-cart-billing/shop-cart-billing.component';
import { ShopCartPaymentComponent } from './pages/shop-cart-payment/shop-cart-payment.component';

import { SessionGuard } from '@core/guards';

const routes: Routes = [
  {
    path: '',
    component: ShopCartHomeComponent,
    canActivate: [SessionGuard],
  },
  {
    path: 'delivery',
    component: ShopCartDeliveryComponent,
    canActivate: [SessionGuard],
  },
  {
    path: 'billing',
    component: ShopCartBillingComponent,
    canActivate: [SessionGuard],
  },
  {
    path: 'payment',
    component: ShopCartPaymentComponent,
    canActivate: [SessionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopCartRoutingModule {}
