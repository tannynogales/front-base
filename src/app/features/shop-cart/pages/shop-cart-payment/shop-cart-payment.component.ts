import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartObject } from '@core/models';
import {
  CartProductsService,
  CartUserService,
  UserService,
} from '@core/services';
import { CartPaymentService } from '@core/services/cart-payment.service';
import {
  PaymentMethod,
  WebpayService,
} from '@core/services/payment-webpay.service';
import { ToastService } from '@shared/components/toast/toast.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { ignoreElements, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-shop-cart-payment',
  templateUrl: './shop-cart-payment.component.html',
  styleUrls: ['./shop-cart-payment.component.scss'],
})
export class ShopCartPaymentComponent implements OnInit {
  webpayService = inject(WebpayService);
  toastService = inject(ToastService);
  userService = inject(UserService);
  cartUserService = inject(CartUserService);
  cartProductsService = inject(CartProductsService);
  cartPaymentService = inject(CartPaymentService);
  shoppingCart$: Observable<ShoppingCartObject>;
  shoppingCart!: ShoppingCartObject;

  router = inject(Router);

  isLoading = false;

  public payPalConfig?: IPayPalConfig;
  paypalOnInit: boolean = false;

  breadcrumbItems = [
    {
      title: 'Carrito de Compras',
      url: '/cart-shopping',
    },
  ];

  cartId = this.cartUserService.getFromLocalStorage()?.cartId;

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

  paymentsMethods: Array<{
    id: PaymentMethod;
    name: string;
    description: string;
    icon: string;
  }> = [
    {
      id: 'webpay',
      name: 'Webpay',
      description: 'Pague con su tarjeta de crédito a través de Webpay.',
      icon: 'assets/images/payments/stripe.svg',
    },
    {
      id: 'bank_transfer',
      name: 'Transferencia',
      description: `Pague mediante transferencia bancaria:
      <div class="my-2 fw-lighter" style="max-width: 992px">
        TANNY NOGALES BELTRAN<br />
        17.327.515-3<br />Banco Itaú <br />Cuenta corriente<br />0224474192<br />
        tanny.nogales&#64;gmail.com
      </div>`,
      icon: 'assets/images/payments/stripe.svg',
    },
  ];

  paymentData: { paymentMethodId: PaymentMethod } = {
    paymentMethodId: 'webpay',
  };

  activeStep = 3;

  constructor() {
    // this.cartId = this.cartUserService.getFromLocalStorage()?.cartId;
    // if (!this.cartId) {
    //   this.router.navigate(['/cart-shopping']);
    // }
    this.shoppingCart$ = this.cartProductsService.shoppingCart$;
    this.shoppingCart$.subscribe((shoppingCart) => {
      this.shoppingCart = shoppingCart;
      console.log('Shopping Cart:', this.shoppingCart);
    });
  }

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
      onInit: (data, actions) => {
        this.paypalOnInit = true;
        console.log('onInit', data, actions);
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

  onSubmit(): boolean {
    if (this.paymentData.paymentMethodId === 'webpay') {
      this.webpayInit();
    }
    if (this.paymentData.paymentMethodId === 'bank_transfer') {
      if (!this.cartId) {
        this.toastService.addToast({
          message: 'No se encontró un carrito.',
        });
        return false;
      }
      this.cartPaymentService
        .updateCart(this.cartId, 6, this.paymentData.paymentMethodId)
        .subscribe({
          next: (response) => {
            console.log('Cart updated successfully:', response);
            this.cartUserService.unSet();
            this.cartProductsService.unSet();
            this.router.navigate(['/cart-shopping/success'], {
              queryParams: {
                paymentMethod: 'bank_transfer',
                cartId: this.cartId,
              },
            });
          },
          error: (error) => {
            this.toastService.addToast({
              message: 'Ha ocurrido un error: ' + JSON.stringify(error),
            });
          },
        });
    }
    return true;
  }

  webpayInit() {
    let cartId: number;
    if (!this.cartId) {
      this.toastService.addToast({
        message: 'No se encontró un carrito.',
      });
      return false;
    } else cartId = this.cartId;

    this.isLoading = true;
    this.webpayService
      .init(
        cartId,
        this.generateSessionId(),
        this.shoppingCart.totalBruto,
        `${window.location.origin}/cart-shopping/success`,
        this.paymentData.paymentMethodId
      )
      .subscribe({
        next: (response) => {
          console.log('Webpay Init Response:', response);
          // Aquí puedes manejar la respuesta de la inicialización de Webpay

          // if (response?.url)
          // window.location.href = `${response.url}/token?${response.token}`;
          this.redirectToWebpay(response.url, response.token);
        },
        error: (InitError: InitError) => {
          this.isLoading = false;
          this.toastService.addToast({
            message: InitError.error.error.message,
          });

          console.error('Error initializing Webpay:', InitError);
        },
      });
    return true;
  }

  redirectToWebpay(url: string, token: string) {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'token_ws';
    input.value = token;

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
  }

  generateSessionId = () => {
    const prefix = 'ECO';
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 20);
    return `${prefix}-${timestamp}-${random}`.substring(0, 61);
  };
}

export interface InitError {
  error: {
    data: any;
    error: {
      message: string;
      name: string;
      status: number;
    };
  };
  message: string;
  name: string;
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
}
