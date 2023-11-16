import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '@core/models';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

export interface ShoppingCartItem {
  // id?: number;
  productId: number;
  // url: string;
  name: string;
  category: string;
  // price: number;
  // primary_image: string;
  // quantity: number;
}

export interface ShoppingCartItemsObject {
  data: {
    products: ShoppingCartItem[];
    // totalBruto: number;
    // IVA: number;
    // totalNeto: number;
    // totalProducts: number;
  };
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartProductsService {
  baseUrl = environment.strapi + '/api';
  siteID = environment.strapiSiteID;

  // Initialize data
  private shoppingCartProductObject: ShoppingCartItemsObject = {
    data: {
      products: [],
      // totalBruto: 0,
      // IVA: 0,
      // totalNeto: 0,
      // totalProducts: 0,
    },
    loading: true,
  };

  private _shoppingCartProducts: BehaviorSubject<ShoppingCartItemsObject> =
    new BehaviorSubject(this.shoppingCartProductObject);

  constructor(private httpClient: HttpClient) {}

  get shoppingCartProducts$(): Observable<ShoppingCartItemsObject> {
    return this._shoppingCartProducts.asObservable();
  }

  fetch(shoppingCartId: string) {
    this.shoppingCartProductObject.loading = true;
    this._shoppingCartProducts.next(this.shoppingCartProductObject);
    const url =
      this.baseUrl +
      `/shopping-cart-products?filters[shopping_cart][id][$eq]=${shoppingCartId}&populate[product][populate][categories]=*&populate[shopping_cart]=*`;
    // console.log(url);
    this.httpClient
      .get<Response>(url)
      .pipe(
        map((response: any) => {
          // this.shoppingCartItemsObject.meta.pagination = {
          //   page: response.meta.pagination.page,
          //   pageCount: response.meta.pagination.pageCount,
          //   pageSize: response.meta.pagination.pageSize,
          //   total: response.meta.pagination.total,
          // };

          return response.data.map((element: any): ShoppingCartItem => {
            // const attributesValues =
            //   element.attributes.product_attribute_values.data.map(
            //     (element: any) => {
            //       return element.attributes.value;
            //     }
            //   );
            console.log(element);
            return {
              productId: element.attributes.product.data.id,
              name: element.attributes.product.data.attributes.name,
              category:
                element.attributes.product.data.attributes.categories.data[0]
                  .attributes.slug,
            };
          });
        })
      )
      .subscribe((data) => {
        this.shoppingCartProductObject.data.products = data;
        this.shoppingCartProductObject.loading = false;
        this._shoppingCartProducts.next(this.shoppingCartProductObject);
      });
  }
}
