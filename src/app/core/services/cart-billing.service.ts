import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartBillingObject } from '@core/models';

@Injectable({
  providedIn: 'root',
})
export class CartBillingService {
  // Initialize data
  private cartBillingObject: CartBillingObject = {
    rut: '',
    nombre: '',
    giro: '',
    direccion: '',
    correo: '',
    telefono: '',
    regionId: '14',
    comunaId: '',
    streetName: '',
    streetNumber: '',
    department: '',
  };

  // Inicializo con el valor que tiene el localStorage
  private _cartBilling: BehaviorSubject<CartBillingObject> =
    new BehaviorSubject(this.getFromLocalStorage());

  constructor() {}

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
}
