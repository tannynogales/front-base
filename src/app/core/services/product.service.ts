import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item, ItemObject, Response } from '@core/models';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = environment.strapi + '/api';
  siteID = environment.strapiSiteID;

  // Initialize data
  private productObject: ItemObject = {
    data: undefined,
    loading: true,
  };

  private _product: BehaviorSubject<ItemObject> = new BehaviorSubject(
    this.productObject
  );

  constructor(private httpClient: HttpClient) {}

  get products$(): Observable<ItemObject> {
    return this._product.asObservable();
  }

  fetch(productID: string, page: number = 1) {
    this.productObject.loading = true;
    this._product.next(this.productObject);
    const url = this.baseUrl + `/products/${productID}?populate=*`;
    // console.log(url);

    this.httpClient
      .get<Response>(url)
      .pipe(
        map((response: any): Item => {
          const attributesValues =
            response.data.attributes.product_attribute_values.data.map(
              (element: any) => {
                return element.attributes.value;
              }
            );

          return {
            slug: response.data.attributes.slug,
            id: response.id,
            code: response.data.attributes.code,
            name: response.data.attributes.name,
            price: parseInt(response.data.attributes.price),
            primary_image: response.data.attributes.primary_image.data
              ? response.data.attributes.primary_image.data?.attributes.url
              : '',
            tag: '',
            description: response.data.attributes.description,
            images: response.data.attributes.images.data
              ? response.data.attributes.images.data.map((element: any) => {
                  return element.attributes.url;
                })
              : [],
            category: response.data.attributes.categories.data.map(
              (element: any) => {
                return element.attributes.slug;
              }
            ),
            attributes: attributesValues,
          };
        })
      )
      .subscribe((data) => {
        this.productObject.data = data;
        this.productObject.loading = false;
        // console.log(this.productObject);
        this._product.next(this.productObject);
      });
  }
}
