import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ShoppingCart, ShoppingCartsObject } from '@layout/layout-admin/models';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartsService {
  baseUrl = environment.strapi + '/api';
  siteID = environment.strapiSiteID;

  // Initialize data
  private shoppingCartsObject: ShoppingCartsObject = {
    data: [],
    loading: true,
    meta: {
      pagination: {
        page: 0,
        pageCount: 0,
        pageSize: 0,
        total: 0,
      },
    },
  };

  private _shoppingCarts: BehaviorSubject<ShoppingCartsObject> =
    new BehaviorSubject(this.shoppingCartsObject);

  constructor(private httpClient: HttpClient) {}

  get shoppingCarts$(): Observable<ShoppingCartsObject> {
    return this._shoppingCarts.asObservable();
  }

  fetch(page: number = 1) {
    this.shoppingCartsObject.loading = true;
    this._shoppingCarts.next(this.shoppingCartsObject);
    const url = this.baseUrl + `/shopping-carts`;
    // console.log(url);
    this.httpClient
      .get<Response>(url)
      .pipe(
        map((response: any) => {
          this.shoppingCartsObject.meta.pagination = {
            page: response.meta.pagination.page,
            pageCount: response.meta.pagination.pageCount,
            pageSize: response.meta.pagination.pageSize,
            total: response.meta.pagination.total,
          };

          return response.data.map((element: any): ShoppingCart => {
            // const attributesValues =
            //   element.attributes.product_attribute_values.data.map(
            //     (element: any) => {
            //       return element.attributes.value;
            //     }
            //   );

            return {
              id: element.id,
              user_name: element.attributes.user_name,
              user_email: element.attributes.user_email,
              user_cellphone: element.attributes.user_cellphone,
              state: element.attributes.state,
              createdAt: element.attributes.createdAt,
              updatedAt: element.attributes.updatedAt,
              publishedAt: element.attributes.publishedAt,
              delivery_option: element.attributes.delivery_option,
              delivery_street_name: element.attributes.delivery_street_name,
              delivery_street_number: element.attributes.delivery_street_number,
              delivery_department: element.attributes.delivery_department,
              // attributes: attributesValues,
            };
          });
        })
      )
      .subscribe((data) => {
        this.shoppingCartsObject.data = data;
        this.shoppingCartsObject.loading = false;
        this._shoppingCarts.next(this.shoppingCartsObject);
      });
  }
}
