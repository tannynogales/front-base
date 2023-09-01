import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopCartHomeComponent } from './pages/shop-cart-home/shop-cart-home.component';
import { ShopCartDeliveryComponent } from './pages/shop-cart-delivery/shop-cart-delivery.component';
import { ShopCartBillingComponent } from './pages/shop-cart-billing/shop-cart-billing.component';
import { ShopCartPaymentComponent } from './pages/shop-cart-payment/shop-cart-payment.component';

const routes: Routes = [
  {
    path: '',
    component: ShopCartHomeComponent,
  },
  {
    path: 'delivery',
    component: ShopCartDeliveryComponent,
  },
  {
    path: 'billing',
    component: ShopCartBillingComponent,
  },
  {
    path: 'payment',
    component: ShopCartPaymentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopCartRoutingModule {}
