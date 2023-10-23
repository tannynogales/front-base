import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartUserService } from '@core/services';

@Component({
  selector: 'app-shop-cart-success',
  templateUrl: './shop-cart-success.component.html',
  styleUrls: ['./shop-cart-success.component.scss'],
})
export class ShopCartSuccessComponent {
  breadcrumbItems = [
    {
      title: 'Carrito de Compras',
      url: '/cart-shopping',
    },
  ];

  cartId = this.cartUserService.getFromLocalStorage()?.cartId;

  constructor(
    private router: Router,
    private cartUserService: CartUserService
  ) {
    if (this.cartId) {
      console.log('cartId found');
      this.router.navigate(['/cart-shopping']);
    }
  }
}
