import { Component } from '@angular/core';
import { CartUserService } from '@core/services';
import { CartUserObject } from '@core/models';

@Component({
  selector: 'app-shop-cart-home',
  templateUrl: './shop-cart-home.component.html',
  styleUrls: ['./shop-cart-home.component.scss'],
})
export class ShopCartHomeComponent {
  name!: string;
  email!: string;

  constructor(private cartUserService: CartUserService) {
    // TODO: unsubscribe
    this.cartUserService.cartUser$.subscribe((user) => {
      this.name = user.name;
      this.email = user.email;
    });
  }

  setCartUser(user: CartUserObject) {
    //TODO: implement ngModel, like i did in cart-delivery
    this.cartUserService.set({
      email: user.email,
      name: user.name,
    });
  }
}
