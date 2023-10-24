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

  unSet() {
    this.cartUserObject = {
      email: '',
      name: '',
      cellphone: '',
    };
    this.saveInLocalStorage();
    this._cartUser.next(this.cartUserObject);
  }

  saveInLocalStorage() {
    localStorage.setItem('cart-user', JSON.stringify(this.cartUserObject));
  }

  // getFromLocalStorage(): CartUserObject {
  //   const carritoData = localStorage.getItem('cart-user');
  //   if (carritoData) {
  //     console.log('if carritoData from localStorage', carritoData);
  //     const data: CartUserObject = JSON.parse(carritoData);

  //     if (data.email != '' && data.name != '') {
  //       console.log(
  //         "if carritoData from localStorage data.email != '' && data.name != ''"
  //       );
  //       return data;
  //     }
  //   }
  //   if (this.userService.checkUser()) {
  //     const user = this.userService.getUser();
  //     console.log('if this.userService.checkUser()', user);

  //     this.cartUserObject.email = user.email;
  //     this.cartUserObject.name = user.name;
  //   }

  //   return this.cartUserObject;
  // }

  getFromLocalStorage(): CartUserObject {
    const data = localStorage.getItem('cart-user');
    if (data) return JSON.parse(data);
    else return this.cartUserObject;
  }

  public createCart(
    user_id: string,
    user_name: string,
    user_email: string,
    userCellphone: string
  ): Observable<Response> {
    const data = {
      data: {
        user_name: user_name,
        user_email: user_email,
        user_cellphone: userCellphone,
        user: user_id,
        state: 1,
      },
    };

    return this.httpClient.post<Response>(
      `${this.baseUrl}/shopping-carts`,
      data
    );
  }

  public updateCart(
    id: number,
    user_id: string,
    user_name: string,
    user_email: string,
    userCellphone: string,
    state: number
  ): Observable<Response> {
    const data = {
      data: {
        user_name: user_name,
        // user_email: user_email,
        user_cellphone: userCellphone,
        user: user_id,
        state: state,
      },
    };

    return this.httpClient.put<Response>(
      `${this.baseUrl}/shopping-carts/${id}`,
      data
    );
  }
}

// TODO: llevar a model's
export interface Response {
  data: Data;
  meta: any;
}

export interface Data {
  id: number;
  attributes: any;
}
