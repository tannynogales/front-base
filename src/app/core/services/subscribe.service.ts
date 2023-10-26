import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SubscribeService {
  baseUrl = environment.strapi + '/api';
  siteID = environment.strapiSiteID;

  constructor(private httpClient: HttpClient) {}

  public create(email: string): Observable<any> {
    const data = {
      data: {
        email: email,
      },
    };

    return this.httpClient.post<any>(`${this.baseUrl}/subscribes`, data);
  }
}
