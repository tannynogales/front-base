import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParentCategory, ParentCategoryObject, Response } from '@core/models';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ParentCategoriesService {
  baseUrl = environment.strapi + '/api';
  siteID = environment.strapiSiteID;

  /* Initialize data */
  private ParentCategoryObject: ParentCategoryObject = {
    data: [],
    loading: true,
  };

  private _parentCategories: BehaviorSubject<ParentCategoryObject> =
    new BehaviorSubject(this.ParentCategoryObject);

  constructor(private httpClient: HttpClient) {}

  get parentCategories$(): Observable<ParentCategoryObject> {
    return this._parentCategories.asObservable();
  }

  fetch() {
    this.ParentCategoryObject.loading = true;
    this._parentCategories.next(this.ParentCategoryObject);
    const url = this.baseUrl + `/parent-categories?populate[seo]=*`; // ?sort=name
    // console.log(url);
    this.httpClient
      .get<Response>(url)
      .pipe(
        map((response: Response) => {
          return response.data.map((element: any): ParentCategory => {
            return {
              id: element.id,
              name: element.attributes.name,
              slug: element.attributes.slug,
              seo: {
                metaTitle: element.attributes?.seo?.metaTitle,
                metaDescription: element.attributes?.seo?.metaDescription,
              },
            };
          });
        })
      )
      .subscribe((data) => {
        this.ParentCategoryObject.data = data;
        this.ParentCategoryObject.loading = false;
        this._parentCategories.next(this.ParentCategoryObject);
      });
  }
}
