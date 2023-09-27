import { Injectable } from '@angular/core';
import { ShoppingCartItem, ShoppingCartObject } from '@core/models';
import { BehaviorSubject, Observable } from 'rxjs';
// TODO pendiente refactorizar klas funciones apra que seqan mas entendibles y reutilizables y con una soal responsabilidad
@Injectable({
  providedIn: 'root',
})
export class CartProductsService {
  // Initialize data
  private shoppingCartObject: ShoppingCartObject = {
    products: [],
    totalBruto: 0,
    IVA: 0,
    totalNeto: 0,
    totalProducts: 0,
  };

  private _shoppingCart: BehaviorSubject<ShoppingCartObject> =
    new BehaviorSubject(this.getFromLocalStorage());

  constructor() {}

  get shoppingCart$(): Observable<ShoppingCartObject> {
    return this._shoppingCart.asObservable();
  }

  private calculateTotalValues() {
    const IVA: number = 0.19;
    const totalBrutoInitialValue: number = 0;
    const { products } = this.shoppingCartObject;

    const totalBruto = products.reduce(
      (accumulator, product) => accumulator + product.price * product.quantity,
      totalBrutoInitialValue
    );

    const totalProducts = products.reduce(
      (accumulator, product) => accumulator + product.quantity,
      0
    );

    this.shoppingCartObject.totalBruto = totalBruto;
    this.shoppingCartObject.IVA = totalBruto * IVA;
    this.shoppingCartObject.totalNeto = totalBruto * (1 + IVA);
    this.shoppingCartObject.totalProducts = totalProducts;
  }

  addProduct(product: ShoppingCartItem, quantity: number = 1) {
    this.shoppingCartObject = this.getFromLocalStorage();

    let doExist: boolean = false;
    const nuevosProductos = this.shoppingCartObject.products.map((item) => {
      if (item.id === product.id) {
        doExist = true;
        // Si encontramos el elemento con el id deseado, incrementamos la cantidad (quantity) en 1
        return {
          ...item,
          quantity: item.quantity + quantity,
        };
      }
      // Si no es el elemento que estamos buscando, simplemente lo dejamos sin cambios
      return item;
    });

    // console.log(doExist, product.id);
    if (!doExist) {
      nuevosProductos.push({
        ...product,
        quantity: 1,
      });
    }

    this.shoppingCartObject.products = nuevosProductos;
    this.calculateTotalValues();
    this.saveInLocalStorage();
    this._shoppingCart.next(this.shoppingCartObject);
  }

  removeProduct(productID: number) {
    this.shoppingCartObject = this.getFromLocalStorage();
    this.shoppingCartObject.products = this.shoppingCartObject.products.filter(
      (item) => item.id !== productID
    );
    this.calculateTotalValues();
    this.saveInLocalStorage();
    this._shoppingCart.next(this.shoppingCartObject);
  }

  saveInLocalStorage() {
    localStorage.setItem(
      'shopping-cart',
      JSON.stringify(this.shoppingCartObject)
    );
  }

  getFromLocalStorage(): ShoppingCartObject {
    const carritoData = localStorage.getItem('shopping-cart');
    if (carritoData) return JSON.parse(carritoData);
    else return this.shoppingCartObject;
  }

  // estas funciones crean un nuevo objeto, por ende no me sirven
  // addProduct(product: ShoppingCartItem) {
  //   const newCartObject = { ...this.shoppingCartObject };
  //   newCartObject.products = [...newCartObject.products, product];
  //   this.calculateTotalValues();
  //   this._shoppingCart.next(newCartObject);
  // }

  // estas funciones crean un nuevo objeto, por ende no me sirven
  // removeProduct(product: ShoppingCartItem) {
  //   const newCartObject = { ...this.shoppingCartObject };
  //   newCartObject.products = newCartObject.products.filter(
  //     (item) => item.id !== product.id
  //   );
  //   this.calculateTotalValues();
  //   this._shoppingCart.next(newCartObject);
  // }
}
