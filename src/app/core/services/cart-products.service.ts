import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCartItem, ShoppingCartObject } from '@core/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

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

  constructor(private httpClient: HttpClient) {}

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

  increaseProductQuantity(productID: number) {
    let { products } = this.getFromLocalStorage();
    let productIndex = products.findIndex((item) => item.id === productID);
    if (productIndex) {
      products[productIndex] = {
        ...products[productIndex],
        quantity: products[productIndex].quantity + 1,
      };
      this.products = products;
    }
  }

  decreaseProductQuantity(productID: number) {
    let { products } = this.getFromLocalStorage();
    let productIndex = products.findIndex((item) => item.id === productID);
    if (productIndex) {
      products[productIndex] = {
        ...products[productIndex],
        quantity: products[productIndex].quantity - 1,
      };
      this.products = products;
    }
  }

  // Agrega un elemento nuevo al carrito
  private createProduct(newProduct: ShoppingCartItem) {
    let { products } = this.getFromLocalStorage();

    // products.push({...newProduct, quantity: 1,});
    products.push(newProduct);

    this.products = products;
  }

  // Actualiza el atributo "products" de la clase y gatilla eventos asociados
  private set products(products: ShoppingCartItem[]) {
    this.shoppingCartObject.products = products;
    this.calculateTotalValues();
    this.saveInLocalStorage();
    this._shoppingCart.next(this.shoppingCartObject);
  }

  private doesExist(productID: number): boolean {
    let doesExist = false;
    const { products } = this.getFromLocalStorage();
    const product = products.find((item) => {
      if (item.id === productID) {
        doesExist = true;
      }
    });
    return doesExist;
  }

  /*
  This function can add or subtract element, depending of the quantity
  */
  addProduct(product: ShoppingCartItem) {
    const doesExist = this.doesExist(product.id);

    if (!doesExist) {
      this.createProduct(product);
      console.log('add');
      this.createProductDB(product.price, product.id, 14).subscribe(
        (response) => {
          console.log('createProductDB', response);
        }
      );
    } else {
      this.increaseProductQuantity(product.id);
    }
  }

  deleteProduct(productID: number) {
    let { products } = this.getFromLocalStorage();
    products = products.filter((item) => item.id !== productID);
    this.products = products;
  }

  private saveInLocalStorage() {
    localStorage.setItem(
      'shopping-cart',
      JSON.stringify(this.shoppingCartObject)
    );
  }

  private getFromLocalStorage(): ShoppingCartObject {
    const carritoData = localStorage.getItem('shopping-cart');
    if (carritoData) return JSON.parse(carritoData);
    else return this.shoppingCartObject;
  }

  baseUrl = environment.strapi + '/api';

  public createProductDB(
    price: number,
    productID: number,
    ShoppingCartID: number
  ): Observable<Response> {
    const data = {
      data: {
        price: price,
        product: productID,
        shopping_cart: ShoppingCartID,
      },
    };
    console.log(data);
    return this.httpClient.post<Response>(
      `${this.baseUrl}/shopping-cart-products`,
      data
    );
  }
}
