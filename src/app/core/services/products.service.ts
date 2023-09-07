import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Category, CategoryObject, Response } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl = environment.strapi + '/api';
  siteID = environment.strapiSiteID;

  // Initialize data
  private categoryObject: CategoryObject = {
    data: [
      {
        id: 1,
        name: 'Product 1',
        slug: 'product-1',
        image: 'https://via.placeholder.com/150',
      },
    ],
    loading: false,
  };

  private _products: BehaviorSubject<CategoryObject> = new BehaviorSubject(
    this.categoryObject
  );

  constructor(private httpClient: HttpClient) {
    console.log(this.categoryObject);
  }

  get products$(): Observable<CategoryObject> {
    return this._products.asObservable();
  }

  fetch() {
    // this.categoryObject.loading = false;
    // this._products.next(this.categoryObject);
    const url =
      this.baseUrl +
      `/categories?filters[site][id][$eq]=${this.siteID}&populate[products]=*`;
    // console.log(url);
    this.httpClient
      .get<Response>(url)
      .pipe(
        map((response: Response) => {
          return response.data.map((element: any): Category => {
            return {
              id: element.id,
              name: element.attributes.name,
              slug: element.attributes.slug,
            };
          });
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.categoryObject.data = data;
        this.categoryObject.loading = true;
        this._products.next(this.categoryObject);
      });
  }

  // getTest$(): Observable<CategoryData> {
  //   return of({
  //     data: [
  //       {
  //         id: 1,
  //         name: 'Product 1',
  //         slug: 'product-1',
  //         image: 'https://via.placeholder.com/150',
  //       },
  //     ],
  //     loading: true,
  //   });
  // }
}
