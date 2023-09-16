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
      `/categories?filters[site][id][$eq]=${this.siteID}&sort=name&populate[parent_categories]=*&populate[image]=*&pagination[pageSize]=100`;
    // console.log(url);

    this.httpClient
      .get<Response>(url)
      .pipe(
        map((response: Response) => {
          return response.data.map((element: any): Category => {
            // if (element.attributes.slug == 'embutidoras-y-churreras')
            // console.log(element.attributes.parent_categories.data);

            return {
              id: element.id,
              name: element.attributes.name,
              slug: element.attributes.slug,
              highlighted: element.attributes?.highlighted ? true : false,
              image: element.attributes?.image?.data
                ? element.attributes.image.data.attributes?.formats?.small?.url
                : '',
              parent_categories:
                element.attributes.parent_categories?.data.length > 0
                  ? element.attributes.parent_categories.data.map(
                      (parent_category: any) => {
                        return parent_category.attributes.slug;
                      }
                    )
                  : [],
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

  filterByParent(parent: string) {
    this._categories.next({
      data: this.categoryObject.data.filter((category) =>
        category.parent_categories?.includes(parent)
      ),
      loading: false,
    });
  }

  get highlightedCategories(): Category[] {
    return this.categoryObject.data.filter(
      (category) => category.highlighted === true
    );
  }

  filterReset() {
    this._categories.next(this.categoryObject);
  }
}
