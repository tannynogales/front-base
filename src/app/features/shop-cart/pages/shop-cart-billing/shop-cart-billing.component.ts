import { Component, OnInit } from '@angular/core';
import {
  CartBillingObject,
  Comuna,
  Region,
  RegionesObject,
} from '@core/models';
import {
  CartBillingService,
  UtilitiesChileRegionesService,
} from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop-cart-billing',
  templateUrl: './shop-cart-billing.component.html',
  styleUrls: ['./shop-cart-billing.component.scss'],
})
export class ShopCartBillingComponent implements OnInit {
  cartBilling!: CartBillingObject;
  regiones$: Observable<RegionesObject>;

  breadcrumbItems = [
    {
      title: 'Carrito de Compras',
      url: '/cart-shopping',
    },
  ];
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

  constructor(
    private cartBillingService: CartBillingService,
    private utilitiesChileRegionesService: UtilitiesChileRegionesService
  ) {
    this.regiones$ = this.utilitiesChileRegionesService.regiones$;
    this.cartBillingService.cartBilling$.subscribe((data) => {
      this.cartBilling = data;
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

  setCartBilling() {
    this.cartBillingService.set(this.cartBilling);
  }
}
