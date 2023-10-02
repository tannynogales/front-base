import { Component } from '@angular/core';
import { CartUserService } from '@core/services';
import { CartUserObject } from '@core/models';

@Component({
  selector: 'app-shop-cart-home',
  templateUrl: './shop-cart-home.component.html',
  styleUrls: ['./shop-cart-home.component.scss'],
})
export class ShopCartHomeComponent {
  breadcrumbItems = [
    {
      title: 'Carrito de Compras',
      url: '/home',
    },
  ];

  cartUser: CartUserObject = {
    name: '',
    email: '',
    cellphone: '',
  };

  constructor(private cartUserService: CartUserService) {
    // TODO: unsubscribe
    this.cartUserService.cartUser$.subscribe((user) => {
      this.cartUser.name = user.name;
      this.cartUser.email = user.email;
      this.cartUser.cellphone = user.cellphone;
    });
  }

  setCartUser() {
    //TODO: implement ngModel, like i did in cart-delivery
    this.cartUserService.set({
      email: this.cartUser.email,
      name: this.cartUser.name,
      cellphone: this.cartUser.cellphone,
    });
  }
}
