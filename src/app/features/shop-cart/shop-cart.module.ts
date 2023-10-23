import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopCartRoutingModule } from './shop-cart-routing.module';
import { ShopCartHomeComponent } from './pages/shop-cart-home/shop-cart-home.component';
import { SharedModule } from '@shared/shared.module';

import { ShopCartPaymentComponent } from './pages/shop-cart-payment/shop-cart-payment.component';
import { ShopCartBillingComponent } from './pages/shop-cart-billing/shop-cart-billing.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { ShopCartSuccessComponent } from './pages/shop-cart-success/shop-cart-success.component';
import { ShopCartDeliveryComponent } from './pages/shop-cart-delivery/shop-cart-delivery.component';

@NgModule({
  declarations: [
    ShopCartHomeComponent,
    ShopCartDeliveryComponent,
    ShopCartPaymentComponent,
    ShopCartBillingComponent,
    ShopCartSuccessComponent,
  ],
  imports: [CommonModule, ShopCartRoutingModule, SharedModule, NgxPayPalModule],
})
export class ShopCartModule {}
