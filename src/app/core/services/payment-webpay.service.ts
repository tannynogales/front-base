import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartDeliveryObject } from '@core/models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export type PaymentMethod = 'webpay' | 'bank_transfer';

@Injectable({
  providedIn: 'root',
})
export class WebpayService {
  baseUrl = environment.strapi + '/api';

  constructor(private httpClient: HttpClient) {}

  public init(
    buy_order: number,
    session_id: string,
    amount: number,
    return_url: string,
    paymentMethod: PaymentMethod
  ): Observable<ResponseInit> {
    const data = {
      buy_order: buy_order,
      session_id: session_id,
      amount: amount,
      return_url: return_url,
      paymentMethod: paymentMethod,
    };
    return this.httpClient.post<ResponseInit>(
      `${this.baseUrl}/webpay/init`,
      data
    );
  }

  public confirm(token_ws: string): Observable<ResponseInit> {
    const data = {
      token_ws: token_ws,
    };
    return this.httpClient.post<ResponseInit>(
      `${this.baseUrl}/webpay/confirm`,
      data
    );
  }
}

// TODO: llevar a model's
// interface Response {
//   data: Data;
//   meta: any;
// }
export interface ResponseInit {
  token: string;
  url: string;
  status: string;
  buy_order: string;
}
// interface Data {

//   id: number;
//   attributes: any;
// }
