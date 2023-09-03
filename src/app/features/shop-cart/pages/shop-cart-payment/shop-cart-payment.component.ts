import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-shop-cart-payment',
  templateUrl: './shop-cart-payment.component.html',
  styleUrls: ['./shop-cart-payment.component.scss'],
})
export class ShopCartPaymentComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;

  steps = [
    {
      title: 'Despacho',
      url: 'cart-shopping/delivery',
    },
    {
      title: 'Facturación',
      url: 'cart-shopping/billing',
    },
    {
      title: 'Pago',
      url: 'cart-shopping/payment',
    },
  ];

  activeStep = 3;

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: environment.paypalCurrency,
      clientId: environment.paypalClientId,
      createOrderOnClient: (data) =>
        <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: environment.paypalCurrency,
                value: '9.99'.toString(), // suma total de items
                breakdown: {
                  item_total: {
                    currency_code: environment.paypalCurrency,
                    value: '9.99', // suma total de items
                  },
                },
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: environment.paypalCurrency,
                    value: '9.99',
                  },
                },
              ],
            },
          ],
        },
      advanced: {
        commit: 'true',
      },
      style: {
        label: 'paypal',
        layout: 'vertical',
      },
      onApprove: (data, actions) => {
        console.log(
          'onApprove - transaction was approved, but not authorized',
          data,
          actions
        );
        actions.order.get().then((details: any) => {
          console.log(
            'onApprove - you can get full order details inside onApprove: ',
            details
          );
        });
      },
      onClientAuthorization: (data) => {
        console.log(
          'onClientAuthorization - you should probably inform your server about completed transaction at this point',
          data
        );
        // this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
        // this.showCancel = true;
      },
      onError: (err) => {
        console.log('OnError', err);
        // this.showError = true;
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
        // this.resetStatus();
      },
    };
  }
}
