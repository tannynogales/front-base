import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item, ItemsObject, Response } from '@core/models';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HighlightedHomeProductsService {
  baseUrl = environment.strapi + '/api';
  siteID = environment.strapiSiteID;

  // Initialize data
  private productsObject: ItemsObject = {
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

  private _products: BehaviorSubject<ItemsObject> = new BehaviorSubject(
    this.productsObject
  );

  constructor(private httpClient: HttpClient) {}

  get highlightedHomeProducts$(): Observable<ItemsObject> {
    return this._products.asObservable();
  }

  fetch() {
    this.productsObject.loading = true;
    this._products.next(this.productsObject);
    const url =
      this.baseUrl +
      `/products?filters[highlighted][$eq]=true&[categories][site][id][$eq]=${this.siteID}&populate[primary_image]=*&populate[categories]=*&populate[product_attribute_values]=*&pagination[pageSize]=12&sort=highlighted_order`;

    // console.log(url);
    this.httpClient
      .get<Response>(url)
      .pipe(
        map((response: any) => {
          this.productsObject.meta.pagination = {
            page: response.meta.pagination.page,
            pageCount: response.meta.pagination.pageCount,
            pageSize: response.meta.pagination.pageSize,
            total: response.meta.pagination.total,
          };

          return response.data.map((element: any): Item => {
            const attributesValues =
              element.attributes.product_attribute_values.data.map(
                (element: any) => {
                  return element.attributes.value;
                }
              );

            // console.log('photo', element.attributes.primary_image);

            return {
              slug: element.attributes.slug,
              id: element.id,
              code: element.attributes.code,
              name: element.attributes.name,
              price: parseInt(element.attributes.price),
              primary_image: element.attributes.primary_image.data
                ? element.attributes.primary_image.data?.attributes?.formats
                    .thumbnail?.url
                : '',
              tag: '',
              images: [],
              category: element.attributes.categories.data.map(
                (element: any) => {
                  return element.attributes.slug;
                }
              ),
              attributes: attributesValues,
            };
          });
        })
      )
      .subscribe((data) => {
        this.productsObject.data = data;
        this.productsObject.loading = false;
        this._products.next(this.productsObject);
      });
  }
}
