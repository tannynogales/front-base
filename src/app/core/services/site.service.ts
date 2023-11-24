import { Injectable } from '@angular/core';
import { SiteObject } from '@core/models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  // Initialize data
  private siteObject: SiteObject = {
    data: {
      cellphone: 56993187101,
      cellphoneFormatted: this.formatCellphone(56993187101),
      name: 'Roble',
      pageTitlePrefix: 'Roble',
      seo: {
        metaTitle: 'Máquinas de gastronomía',
        metaDescription:
          'Descubre la mejor selección de revolvedoras, embutidoras, moledoras de carne, motores y equipamiento para panaderías, pastelerías, carnicerías, refrigeración y restaurantes. ¡Impulsa tu negocio en la industria gastronómica con nuestras soluciones de calidad',
      },
      image:
        'https://storage.googleapis.com/roble-strapi-bucket/site_og_image_ebbef09a93/site_og_image_ebbef09a93.jpg',
    },
    loading: true,
  };

  private _site: BehaviorSubject<SiteObject> = new BehaviorSubject(
    this.siteObject
  );

  constructor() {} // private httpClient: HttpClient

  get site$(): Observable<SiteObject> {
    return this._site.asObservable();
  }

  fetch(domain: string) {
    // console.log('fetch site', domain);
    // this.siteObject.data = data;
    this.siteObject.loading = false;
    this._site.next(this.siteObject);
  }

  private formatCellphone(cellphone: number): string {
    const cellphoneString = cellphone.toString();
    return cellphoneString.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
  }
}
