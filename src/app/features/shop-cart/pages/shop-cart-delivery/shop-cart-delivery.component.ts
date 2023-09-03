import { Component } from '@angular/core';

@Component({
  selector: 'app-shop-cart-delivery',
  templateUrl: './shop-cart-delivery.component.html',
  styleUrls: ['./shop-cart-delivery.component.scss'],
})
export class ShopCartDeliveryComponent {
  breadcrumbItems = [
    {
      title: 'Carrito de Compras',
      url: '/cart-shopping',
    },
  ];
  despachoRadioItems = [
    {
      id: 1,
      title: 'Retiro en tienda',
      description:
        'Avenida Recoleta #2504, Comuna de Recoleta, Santiago, Chile',
    },
    {
      id: 2,
      title: 'Despacho por chilexpress',
      description: 'Los Mirlos #181, Viña del Mar, Chile',
    },
  ];
  selectedDespachoOption: number = 1;

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

  activeStep = 1;
}
