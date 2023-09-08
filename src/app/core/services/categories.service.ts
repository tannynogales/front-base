import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CategoryObject, Response } from '@core/models';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseUrl = environment.strapi + '/api';
  siteID = environment.strapiSiteID;

  /* Initialize data */
  private categoryObject: CategoryObject = {
    data: [],
    loading: true,
  };

  private _categories: BehaviorSubject<CategoryObject> = new BehaviorSubject(
    this.categoryObject
  );

  constructor(private httpClient: HttpClient) {}

  get categories$(): Observable<CategoryObject> {
    return this._categories.asObservable();
  }

  fetch() {
    this.categoryObject.loading = true;
    this._categories.next(this.categoryObject);
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
        this.categoryObject.data = data;
        this.categoryObject.loading = false;
        this._categories.next(this.categoryObject);
      });
  }
}
