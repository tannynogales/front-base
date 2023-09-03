import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopCartRoutingModule } from './shop-cart-routing.module';
import { ShopCartHomeComponent } from './pages/shop-cart-home/shop-cart-home.component';
import { SharedModule } from '@shared/shared.module';
import { ShopCartDeliveryComponent } from './pages/shop-cart-delivery/shop-cart-delivery.component';
import { ShopCartPaymentComponent } from './pages/shop-cart-payment/shop-cart-payment.component';
import { ShopCartBillingComponent } from './pages/shop-cart-billing/shop-cart-billing.component';
import { NgxPayPalModule } from 'ngx-paypal';

@NgModule({
  declarations: [
    ShopCartHomeComponent,
    ShopCartDeliveryComponent,
    ShopCartPaymentComponent,
    ShopCartBillingComponent,
  ],
  imports: [CommonModule, ShopCartRoutingModule, SharedModule, NgxPayPalModule],
})
export class ShopCartModule {}
