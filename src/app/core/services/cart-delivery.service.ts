import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartDeliveryObject } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartDeliveryService {
  baseUrl = environment.strapi + '/api';

  // Initialize data
  private cartDeliveryObject: CartDeliveryObject = {
    deliveryOption: '1',
    regionId: '14',
    comunaId: '259',
    streetName: '',
    streetNumber: '',
    department: '',
    packagingCost: false,
    shippingCost: false,
  };

  // Inicializo con el valor que tiene el localStorage
  private _cartDelivery: BehaviorSubject<CartDeliveryObject> =
    new BehaviorSubject(this.getFromLocalStorage());

  constructor(private httpClient: HttpClient) {}

  get cartDelivery$(): Observable<CartDeliveryObject> {
    return this._cartDelivery.asObservable();
  }

  set(data: CartDeliveryObject) {
    this.cartDeliveryObject = data;
    this.saveInLocalStorage();
    this._cartDelivery.next(this.cartDeliveryObject);
  }

  saveInLocalStorage() {
    localStorage.setItem(
      'cart-delivery',
      JSON.stringify(this.cartDeliveryObject)
    );
  }

  getFromLocalStorage(): CartDeliveryObject {
    const data = localStorage.getItem('cart-delivery');
    if (data) return JSON.parse(data);
    else return this.cartDeliveryObject;
  }

  public updateCart(
    id: number,
    deliveryOption: string,
    regionId: string,
    comunaId: string,
    streetName: string,
    streetNumber: string,
    department: string,
    state: number
  ): Observable<Response> {
    const data = {
      data: {
        delivery_option: deliveryOption,
        delivery_region: regionId,
        delivery_comuna: comunaId,
        delivery_street_name: streetName,
        delivery_street_number: streetNumber,
        delivery_department: department,
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

// TODO: llevar a model's
interface Response {
  data: Data;
  meta: any;
}

interface Data {
  id: number;
  attributes: any;
}
