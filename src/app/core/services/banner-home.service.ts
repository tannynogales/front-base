import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { BannerHome, BannerHomeObject, Response } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BannerHomeService {
  baseUrl = environment.strapi + '/api';
  siteID = environment.strapiSiteID;

  // Initialize data
  private bannersHomeObject: BannerHomeObject = {
    data: [],
    loading: true,
  };

  private _bannersHome: BehaviorSubject<BannerHomeObject> = new BehaviorSubject(
    this.bannersHomeObject
  );

  constructor(private httpClient: HttpClient) {}

  get bannersHome$(): Observable<BannerHomeObject> {
    return this._bannersHome.asObservable();
  }

  fetch() {
    this.bannersHomeObject.loading = true;
    this._bannersHome.next(this.bannersHomeObject);
    const url = this.baseUrl + `/banners-home?populate[image]=*&sort=order:asc`;
    this.httpClient
      .get<Response>(url)
      .pipe(
        map((response: any) => {
          return response.data.map((element: any): BannerHome => {
            return {
              slug: element.attributes.slug,
              id: element.id,
              title: element.attributes.title,
              description: element.attributes.description,
              image: element.attributes?.image?.data
                ? element.attributes.image.data.attributes?.formats?.small?.url
                : '',
              callToActionLabel: element.attributes.call_to_action_label,
              callToActionUrl: element.attributes.call_to_action_url,
              price: parseInt(element.attributes.price),
            };
          });
        })
      )
      .subscribe((data) => {
        this.bannersHomeObject.data = data;
        this.bannersHomeObject.loading = false;
        this._bannersHome.next(this.bannersHomeObject);
      });
  }
}
