import { CartUserService } from './cart-user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCartItem, ShoppingCartObject } from '@core/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Response } from '@core/models';

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

  constructor(
    private httpClient: HttpClient,
    private cartUserService: CartUserService
  ) {}

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
    let productIndex = products.findIndex(
      (item) => item.productId === productID
    );

    let quantity!: number;
    if (productIndex !== -1) {
      quantity = products[productIndex].quantity + 1;
      products[productIndex] = {
        ...products[productIndex],
        quantity: quantity,
      };
      this.products = products;
    }

    const shoppingCartProductsId = products[productIndex]?.id;
    if (shoppingCartProductsId && productIndex) {
      const cart = this.cartUserService.getFromLocalStorage();

      if (cart.cartId)
        this.updateProductDB(
          shoppingCartProductsId, // ID del item shopping-cart-products
          products[productIndex].price,
          products[productIndex].productId,
          cart.cartId,
          quantity
        ).subscribe((response) => {
          console.log('updateProductDB', shoppingCartProductsId, response);
        });
    } else {
      const cart = this.cartUserService.getFromLocalStorage();
      if (cart.cartId) this.__create(products[productIndex], cart.cartId);
    }
  }

  decreaseProductQuantity(productID: number) {
    console.log('decreaseProductQuantity', productID);
    let { products } = this.getFromLocalStorage();
    let productIndex = products.findIndex(
      (item) => item.productId === productID
    );
    let quantity!: number;
    if (productIndex) {
      quantity = products[productIndex].quantity - 1;
      products[productIndex] = {
        ...products[productIndex],
        quantity: quantity,
      };
      this.products = products;
    }

    const shoppingCartProductsId = products[productIndex]?.id;
    if (shoppingCartProductsId && productIndex) {
      const cart = this.cartUserService.getFromLocalStorage();

      if (cart.cartId)
        this.updateProductDB(
          shoppingCartProductsId, // ID del item shopping-cart-products
          products[productIndex].price,
          products[productIndex].productId,
          cart.cartId,
          quantity
        ).subscribe((response) => {
          console.log('updateProductDB', shoppingCartProductsId, response);
        });
    } else {
      const cart = this.cartUserService.getFromLocalStorage();
      if (cart.cartId) this.__create(products[productIndex], cart.cartId);
    }
  }

  // Agrega un elemento nuevo al carrito
  private createProduct(product: ShoppingCartItem) {
    let { products } = this.getFromLocalStorage();

    const cart = this.cartUserService.getFromLocalStorage();
    if (cart.cartId) {
      this.__create(product, cart.cartId);
    }
    // Si no existe, entonces guardo localmente el producto
    else {
      // products.push({...newProduct, quantity: 1,});
      products.push(product);
      this.products = products;
    }
  }
  private __create(product: ShoppingCartItem, cartId: number) {
    // ¿Existe un carrito creado?
    // Si existe, creamos el producto en la BD
    this.createProductDB(
      product.price,
      product.productId,
      cartId,
      product.quantity
    ).subscribe((response) => {
      const shoppingCartProductId = response?.data?.id;
      console.log('createProductDB', shoppingCartProductId);

      if (shoppingCartProductId) {
        // Actualizar
        let { products } = this.getFromLocalStorage();
        const updatedProducts = products.map((product) => {
          if (product.productId === product.productId) {
            // Clonar el objeto y actualizar el valor
            return { ...product, id: shoppingCartProductId };
          }
          // Mantener los otros elementos sin cambios
          return product;
        });

        this.products = updatedProducts;
      } else {
        console.log(
          'createProductDB ERROR, cant get response.data[0].id',
          response
        );
      }
    });
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
      if (item.productId === productID) {
        doesExist = true;
      }
    });
    return doesExist;
  }

  /*
  This function can add or subtract element, depending of the quantity
  */
  addProduct(product: ShoppingCartItem) {
    const doesExist = this.doesExist(product.productId);

    if (!doesExist) {
      this.createProduct(product);
    } else {
      this.increaseProductQuantity(product.productId);
    }
  }

  deleteProduct(productID: number) {
    let { products } = this.getFromLocalStorage();

    let productIndex = products.findIndex(
      (item) => item.productId === productID
    );
    if (productIndex !== -1) {
      const shoppingCartProductsId = products[productIndex]?.id;
      if (shoppingCartProductsId) {
        this.deleteProductDB(shoppingCartProductsId).subscribe((response) => {
          console.log('deleteProductDB', shoppingCartProductsId, response);
        });
      }
    }

    products = products.filter((item) => item.productId !== productID);
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

  private createProductDB(
    price: number,
    productID: number,
    ShoppingCartID: number,
    quantity: number
  ): Observable<any> {
    //TODO cambiar any por responce, pero explota porque el model usar un array que no tiene sentido
    const data = {
      data: {
        price: price,
        product: productID,
        shopping_cart: ShoppingCartID,
        quantity: quantity,
      },
    };
    return this.httpClient.post<Response>(
      `${this.baseUrl}/shopping-cart-products`,
      data
    );
  }
  private updateProductDB(
    id: number,
    price: number,
    productID: number,
    ShoppingCartID: number,
    quantity: number
  ): Observable<Response> {
    const data = {
      data: {
        price: price,
        product: productID,
        shopping_cart: ShoppingCartID,
        quantity: quantity,
      },
    };
    console.log(data);
    return this.httpClient.put<Response>(
      `${this.baseUrl}/shopping-cart-products/${id}`,
      data
    );
  }
  private deleteProductDB(id: number): Observable<Response> {
    return this.httpClient.delete<Response>(
      `${this.baseUrl}/shopping-cart-products/${id}`
    );
  }
}
