import { UserService } from '@core/services/user.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartUserObject } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartUserService {
  baseUrl = environment.strapi + '/api';

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

  constructor(
    private userService: UserService,
    private httpClient: HttpClient
  ) {}

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

  public createCart(
    user_name: string,
    user_email: string,
    userCellphone: string
  ): Observable<Response> {
    const data = {
      data: {
        user_name: user_name,
        user_email: user_email,
        user_cellphone: userCellphone,
        user: 1,
      },
    };

    return this.httpClient.post<Response>(
      `${this.baseUrl}/shopping-carts`,
      data
    );
  }

  public updateCart(
    id: string,
    user_name: string,
    user_email: string,
    userCellphone: string
  ): Observable<Response> {
    const data = {
      data: {
        user_name: user_name,
        // user_email: user_email,
        user_cellphone: userCellphone,
        user: 1,
      },
    };

    return this.httpClient.put<Response>(
      `${this.baseUrl}/shopping-carts/${id}`,
      data
    );
  }
}

export interface Response {
  data: Data;
  meta: any;
}

export interface Data {
  id: string;
  attributes: any;
}
