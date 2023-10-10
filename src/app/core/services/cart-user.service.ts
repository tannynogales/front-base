import { UserService } from '@core/services/user.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartUserObject } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class CartUserService {
  // Initialize data
  private cartUserObject: CartUserObject = {
    email: '',
    name: '',
    cellphone: '',
  };

  // Inicializo con el valor que tiene el localStorage
  private _cartUser: BehaviorSubject<CartUserObject> = new BehaviorSubject(
    this.getFromLocalStorage()
  );

  constructor(private userService: UserService) {}

  get cartUser$(): Observable<CartUserObject> {
    return this._cartUser.asObservable();
  }

  set(data: CartUserObject) {
    this.cartUserObject = data;
    this.saveInLocalStorage();
    this._cartUser.next(this.cartUserObject);
  }

  saveInLocalStorage() {
    localStorage.setItem('cart-user', JSON.stringify(this.cartUserObject));
  }

  getFromLocalStorage(): CartUserObject {
    const carritoData = localStorage.getItem('cart-user');
    if (carritoData) {
      const data: CartUserObject = JSON.parse(carritoData);

      if (data.email != '' && data.name != '') {
        return data;
      }
    }
    if (this.userService.checkUser()) {
      const user = this.userService.getUser();
      this.cartUserObject.email = user.email;
      this.cartUserObject.name = user.name;
    }

    return this.cartUserObject;
  }
}
