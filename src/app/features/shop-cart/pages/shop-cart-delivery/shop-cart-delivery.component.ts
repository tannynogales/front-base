import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import {
  CartDeliveryObject,
  Comuna,
  Region,
  RegionesObject,
} from '@core/models';
import {
  CartDeliveryService,
  UtilitiesChileRegionesService,
} from '@core/services';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-shop-cart-delivery',
  templateUrl: './shop-cart-delivery.component.html',
  styleUrls: ['./shop-cart-delivery.component.scss'],
})
export class ShopCartDeliveryComponent implements OnInit {
  cartDelivery!: CartDeliveryObject;

  breadcrumbItems = [
    {
      title: 'Carrito de Compras',
      url: '/cart-shopping',
    },
  ];
  despachoRadioItems = [
    {
      id: '1',
      title: 'Retiro en tienda',
      description:
        'Avenida Recoleta #2504, Comuna de Recoleta, Santiago, Chile.',
    },
    {
      id: '2',
      title: 'Despacho',
      description:
        'Despacho dentro de Santiago o Envío a regiones por pagar a través de Litcargo.',
    },
  ];

  // selectedDespachoOption: number = 1;
  // selectedRegionOption: string = '14'; // Metropolitana
  // selectedComunaOption?: number;

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

  regiones$: Observable<RegionesObject>;
  constructor(
    private router: Router,
    private utilitiesChileRegionesService: UtilitiesChileRegionesService,
    private cartDeliveryService: CartDeliveryService
  ) {
    this.regiones$ = this.utilitiesChileRegionesService.regiones$;
    this.cartDeliveryService.cartDelivery$.subscribe((delivery) => {
      this.cartDelivery = delivery;
    });
  }

  ngOnInit(): void {
    //TODO: I should call this service in the layout. In this point, I will call the service every time that I visit the page.
    this.utilitiesChileRegionesService.fetch();
  }

  getComunasByRegion(regiones: Region[], regionId: string): Comuna[] {
    const region = regiones.find((element) => element.id == regionId);

    const comunas = region?.comunas;

    if (comunas) {
      return comunas;
    } else return [];
  }

  setCartDelivery() {
    this.cartDeliveryService.set(this.cartDelivery);
  }
}
