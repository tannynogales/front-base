import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Comuna, Region, RegionesObject } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesChileRegionesService {
  baseUrl = environment.strapi + '/api';
  siteID = environment.strapiSiteID;

  // Initialize data
  private regionesObject: RegionesObject = {
    data: [],
    loading: true,
  };

  private _regiones: BehaviorSubject<RegionesObject> = new BehaviorSubject(
    this.regionesObject
  );

  constructor(private httpClient: HttpClient) {}

  get regiones$(): Observable<RegionesObject> {
    return this._regiones.asObservable();
  }

  fetch() {
    this.regionesObject.loading = true;
    this._regiones.next(this.regionesObject);
    const url =
      this.baseUrl +
      `/utilities-chile-regions?sort=name&populate[chile_comunas]=*`;
    // console.log(url);
    this.httpClient
      .get<Response>(url)
      .pipe(
        map((response: any) => {
          return response.data.map((element: any): Region => {
            return {
              id: element.id,
              name: element.attributes.name,
              code: element.attributes.code,
              comunas: element.attributes.chile_comunas.data.map(
                (comuna: any): Comuna => {
                  return {
                    id: comuna.id,
                    name: comuna.attributes.name,
                    code: comuna.attributes.code,
                    costo_despacho: comuna.attributes.costo_despacho
                      ? comuna.attributes.costo_despacho
                      : 0,
                  };
                }
              ),
            };
          });
        })
      )
      .subscribe((data) => {
        this.regionesObject.data = data;
        this.regionesObject.loading = false;
        this._regiones.next(this.regionesObject);
      });
  }
}
