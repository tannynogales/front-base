import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartPaymentService {
  baseUrl = environment.strapi + '/api';

  httpClient = inject(HttpClient);

  public updateCart(
    id: number,
    state: number,
    payment_method: string
  ): Observable<Response> {
    const data = {
      data: {
        state: state,
        payment_method: payment_method,
      },
    };
    console.log(`/shopping-carts/${id}`, data);
    return this.httpClient.put<Response>(
      `${this.baseUrl}/shopping-carts/${id}`,
      data
    );
  }
}
