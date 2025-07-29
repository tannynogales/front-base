import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Customer, CustomrsObject } from '@layout/layout-admin/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  baseUrl = environment.strapi + '/api';
  siteID = environment.strapiSiteID;

  // Initialize data
  private customersObject: CustomrsObject = {
    data: [],
    loading: true,
    // meta: {
    //   pagination: {
    //     page: 0,
    //     pageCount: 0,
    //     pageSize: 0,
    //     total: 0,
    //   },
    // },
  };

  private _customers: BehaviorSubject<CustomrsObject> = new BehaviorSubject(
    this.customersObject
  );

  constructor(private httpClient: HttpClient) {}

  get customers$(): Observable<CustomrsObject> {
    return this._customers.asObservable();
  }

  fetch(page: number = 1) {
    this.customersObject.loading = true;
    this._customers.next(this.customersObject);
    const url = this.baseUrl + `/users`;
    // console.log(url);
    this.httpClient
      .get<Response>(url)
      .pipe(
        map((response: any) => {
          // this.customersObject.meta.pagination = {
          //   page: response.meta.pagination.page,
          //   pageCount: response.meta.pagination.pageCount,
          //   pageSize: response.meta.pagination.pageSize,
          //   total: response.meta.pagination.total,
          // };

          return response.map((element: any): Customer => {
            // const attributesValues =
            //   element.attributes.product_attribute_values.data.map(
            //     (element: any) => {
            //       return element.attributes.value;
            //     }
            //   );

            return {
              id: element.id,
              username: element.username,
              email: element.email,
              provider: element.provider,
              confirmed: element.confirmed,
              blocked: element.blocked,
              createdAt: element.created_at,
              updatedAt: element.updated_at,
            };
          });
        })
      )
      .subscribe((data) => {
        this.customersObject.data = data;
        this.customersObject.loading = false;
        this._customers.next(this.customersObject);
      });
  }
}
