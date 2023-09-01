import { Component } from '@angular/core';

@Component({
  selector: 'app-shop-cart-billing',
  templateUrl: './shop-cart-billing.component.html',
  styleUrls: ['./shop-cart-billing.component.scss'],
})
export class ShopCartBillingComponent {
  steps = [
    {
      title: 'Despacho',
      url: 'cart-shopping/delivery',
    },
    {
      title: 'Facturación',
      url: 'cart-shopping/billing',
    },
    {
      title: 'Pago',
      url: 'cart-shopping/payment',
    },
  ];

  activeStep = 2;
}
