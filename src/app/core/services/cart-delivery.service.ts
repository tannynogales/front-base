import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartDeliveryObject } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class CartDeliveryService {
  // Initialize data
  private cartDeliveryObject: CartDeliveryObject = {
    deliveryOption: '1',
    regionId: '14',
    comunaId: '',
    streetName: '',
    streetNumber: '',
    department: '',
    packagingCost: false,
    shippingCost: false,
  };

  // Inicializo con el valor que tiene el localStorage
  private _cartDelivery: BehaviorSubject<CartDeliveryObject> =
    new BehaviorSubject(this.getFromLocalStorage());

  constructor() {}

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
}
