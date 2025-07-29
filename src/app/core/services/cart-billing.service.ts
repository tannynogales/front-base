import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartBillingObject } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartBillingService {
  baseUrl = environment.strapi + '/api';

  // Initialize data
  private cartBillingObject: CartBillingObject = {
    billing_type: 35,
    billing_email: '',
    billing_telefono: '',
    billing_rut: '',
    billing_name: '',
    billing_giro: '',
    billing_direccion: '',
    billing_comuna: '',
  };

  // Inicializo con el valor que tiene el localStorage
  private _cartBilling: BehaviorSubject<CartBillingObject> =
    new BehaviorSubject(this.getFromLocalStorage());

  constructor(private httpClient: HttpClient) {}

  get cartBilling$(): Observable<CartBillingObject> {
    return this._cartBilling.asObservable();
  }

  set(data: CartBillingObject) {
    this.cartBillingObject = data;
    this.saveInLocalStorage();
    this._cartBilling.next(this.cartBillingObject);
  }

  saveInLocalStorage() {
    localStorage.setItem(
      'cart-billing',
      JSON.stringify(this.cartBillingObject)
    );
  }

  getFromLocalStorage(): CartBillingObject {
    const data = localStorage.getItem('cart-billing');
    if (data) return JSON.parse(data);
    else return this.cartBillingObject;
  }

  public updateBilling(
    id: number,
    cartBillingObject: CartBillingObject,
    state: number
  ): Observable<Response> {
    const data = {
      data: {
        billing_type: cartBillingObject.billing_type.toString(),
        billing_email: cartBillingObject.billing_email,
        billing_telefono: cartBillingObject.billing_telefono,
        billing_rut: cartBillingObject.billing_rut,
        billing_name: cartBillingObject.billing_name,
        billing_giro: cartBillingObject.billing_giro,
        billing_direccion: cartBillingObject.billing_direccion,
        billing_comuna: cartBillingObject.billing_comuna,
        state: state,
      },
    };
    console.log(`/shopping-carts/${id}`, data);
    return this.httpClient.put<Response>(
      `${this.baseUrl}/shopping-carts/${id}`,
      data
    );
  }
}
