import {
  WebpayService,
  ResponseInit,
} from '@core/services/payment-webpay.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@shared/components/toast/toast.service';
import { CartUserService } from '@core/services/cart-user.service';
import { CartProductsService } from '@core/services/cart-products.service';

declare var gtag: any;

// interface ResponseWebpay {
//   amount: number;
//   status: string; // INITIALIZED
//   buy_order: string;
//   session_id: string;
//   accounting_date: string;
//   transaction_date: Date;
//   installments_number: number;
// }

interface ResponseWebpay {
  vci?: string; // ej TSY
  amount: number;
  status: string; // INITIALIZED o AUTHORIZED
  response_code?: number; // ej 0 si fue autorizado
  buy_order: string; // ej 84
  session_id: string; // ej ECO-1751233796545-uyl19ea
  card_detail?: {
    card_number: string; // ej 6623
  };
  accounting_date: string; // ej 0629
  transaction_date: string; // ej 2025-06-29T21:49:57.020Z
  authorization_code?: string; // ej "1213",
  payment_type_code?: string; // ej VN (venta normal tdc), VD (venta débito), VC (venta en cuotas), ...
  installments_number: number; // ej 0
  [key: string]: any; // To allow additional properties
}

interface ErrorWebpay {
  status: number;
  statusText: string;
  url: string;
  ok: boolean;
  error: {
    data: any;
    error: {
      status: number;
      name: string;
      message: string;
    };
  };
}

@Component({
  selector: 'app-shop-cart-success',
  templateUrl: './shop-cart-success.component.html',
  styleUrls: ['./shop-cart-success.component.scss'],
})
export class ShopCartSuccessComponent implements OnInit {
  // router = inject(Router);
  // cartUserService = inject(CartUserService);
  activatedRoute = inject(ActivatedRoute);
  webpayService = inject(WebpayService);

  cartUserService = inject(CartUserService);
  cartProductsService = inject(CartProductsService);

  loading = true;
  title!: string;
  message!: string;
  button: {
    text: string;
    url: string;
  } = {
    text: 'Seguir comprando',
    url: '/',
  };

  toastService = inject(ToastService);

  breadcrumbItems = [
    {
      title: 'Carrito de Compras',
      url: '/cart-shopping',
    },
  ];

  // cartId = this.cartUserService.getFromLocalStorage()?.cartId;
  cartId!: string;

  responseWebpayInit!: ResponseInit;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.cartId = params['cartId'] ?? params['TBK_ORDEN_COMPRA'];

      const paymentMethod = params['paymentMethod'];

      if (paymentMethod === 'bank_transfer') {
        this.message =
          'Nuestros ejcutivos validarán el pago y se contactarán contigo.';
        this.loading = false;
        return;
      }

      const TBK_TOKEN = params['TBK_TOKEN'];
      const TBK_ID_SESION = params['TBK_ID_SESION'];

      // Cuando el usuario abandona la página de pago
      if (TBK_TOKEN && TBK_ID_SESION) {
        this.title = 'Ups, algo salió mal';
        this.message =
          'El pago no se ha podido procesar. Por favor, inténtalo de nuevo.';
        this.loading = false;
        this.button = {
          text: 'Volver a intentar',
          url: '/cart-shopping/payment',
        };
        return;
      }

      const token_ws = params['token_ws'];
      if (token_ws) {
        this.webpayService.confirm(token_ws).subscribe({
          next: (response) => {
            console.log('Webpay confirm response:', response);
            this.responseWebpayInit = response;
            this.cartId = response.buy_order;
            this.loading = false;

            if (response.status === 'AUTHORIZED') {
              this.title = 'Su pago ha sido procesado con éxito';
              this.message =
                'Gracias por su compra. Su pedido ha sido recibido y está siendo procesado. Pronto un ejecutivo se pondrá en contacto contigo para coordinar la entrega.';
              this.button = {
                text: 'Seguir comprando',
                url: '/',
              };
              this.cartUserService.unSet();
              this.cartProductsService.unSet();
            } else {
              this.title = 'Ups, algo salió mal';
              this.message =
                'El pago no se ha podido procesar. Por favor, inténtalo de nuevo.';
              this.button = {
                text: 'Volver a intentar',
                url: '/cart-shopping/payment',
              };
            }
          },
          error: (errorWebpay: ErrorWebpay) => {
            this.toastService.addToast({
              message: errorWebpay.error.error.message,
            });
            this.title = 'Ups, algo salió mal';
            this.message =
              'El pago no se ha podido procesar. Por favor, inténtalo de nuevo.';
            this.loading = false;
            this.button = {
              text: 'Volver a intentar',
              url: '/cart-shopping/payment',
            };
            console.error('Error confirming Webpay:', errorWebpay);
          },
        });

        return;
      }
    });
  }
}
