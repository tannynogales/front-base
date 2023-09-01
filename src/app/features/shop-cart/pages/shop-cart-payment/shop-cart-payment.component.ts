import { Component } from '@angular/core';

@Component({
  selector: 'app-shop-cart-payment',
  templateUrl: './shop-cart-payment.component.html',
  styleUrls: ['./shop-cart-payment.component.scss'],
})
export class ShopCartPaymentComponent {
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

  activeStep = 3;
}
