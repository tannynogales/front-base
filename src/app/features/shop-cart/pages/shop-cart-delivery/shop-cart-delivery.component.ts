import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  CartDeliveryObject,
  Comuna,
  Region,
  ShoppingCartObject,
} from '@core/models';
import {
  CartDeliveryService,
  CartProductsService,
  CartUserService,
  UserService,
  UtilitiesChileRegionesService,
} from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop-cart-delivery',
  templateUrl: './shop-cart-delivery.component.html',
  styleUrls: ['./shop-cart-delivery.component.scss'],
})
export class ShopCartDeliveryComponent implements OnInit {
  cartDelivery!: CartDeliveryObject;
  regiones!: regionesOptions[];
  comunas!: comunasOptions[];
  cartId = this.cartUserService.getFromLocalStorage()?.cartId;

  form: FormGroup = new FormGroup({});
  isLoading: boolean = false;

  breadcrumbItems = [
    {
      title: 'Carrito de Compras',
      url: '/cart-shopping',
    },
  ];
  despachoRadioItems = [
    {
      id: '1',
      title: 'Retiro en tienda',
      description:
        'Avenida Recoleta #2504, Comuna de Recoleta, Santiago, Chile.',
    },
    {
      id: '2',
      title: 'Despacho',
      description:
        'Despacho dentro de Santiago o Envío a regiones por pagar a través de Litcargo.',
    },
  ];

  // selectedDespachoOption: number = 1;
  // selectedRegionOption: string = '14'; // Metropolitana
  // selectedComunaOption?: number;

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

  activeStep = 1;
  shoppingCart$: Observable<ShoppingCartObject>;

  constructor(
    private router: Router,
    private utilitiesChileRegionesService: UtilitiesChileRegionesService,
    private cartDeliveryService: CartDeliveryService,
    private cartProductsService: CartProductsService,
    private cartUserService: CartUserService,
    private elementRef: ElementRef
  ) {
    if (!this.cartId) {
      console.log('cartId not found');
      this.router.navigate(['/cart-shopping']);
    }

    this.utilitiesChileRegionesService.regiones$.subscribe((regiones) => {
      this.regiones = this.regionToOptions(regiones.data);
      if (this.cartDelivery?.regionId)
        this.comunas = this.getComunasByRegion(this.cartDelivery.regionId);
    });

    this.cartDeliveryService.cartDelivery$.subscribe((delivery) => {
      this.cartDelivery = delivery;
    });
    this.shoppingCart$ = this.cartProductsService.shoppingCart$;
  }

  ngOnInit(): void {
    //TODO: I should call this service in the layout. In this point, I will call the service every time that I visit the page.
    this.utilitiesChileRegionesService.fetch();

    this.form = new FormGroup({
      region: new FormControl<string>(this.cartDelivery.regionId, [
        Validators.required,
      ]),
      comuna: new FormControl<string>(this.cartDelivery.comunaId, [
        Validators.required,
      ]),
      streetName: new FormControl<string>(this.cartDelivery.streetName, [
        Validators.required,
      ]),
      streetNumber: new FormControl<string>(this.cartDelivery.streetNumber, [
        Validators.required,
      ]),
      department: new FormControl<string>(this.cartDelivery.department, []),
    });
  }

  getComunasByRegion(regionId: string): comunasOptions[] {
    const regiones = this.regiones;

    const region = regiones.find((element) => element.value == regionId);

    const comunas = region?.comunas;

    if (comunas) {
      return this.comunaToOptions(comunas);
    } else return [];
  }

  regionToOptions(regiones: Region[]): regionesOptions[] {
    console.log('regionToOptions');
    const options = regiones.map((region) => {
      return {
        value: region.id,
        // label: `${region.name} (${region.id})`,
        label: region.name,
        comunas: region.comunas,
      };
    });
    return options;
  }

  comunaToOptions(comunas: Comuna[]): comunasOptions[] {
    console.log('comunaToOptions');
    const options = comunas.map((comuna) => {
      return {
        value: comuna.id,
        label: comuna.name,
      };
    });
    return options;
  }
  onRegionChange() {
    console.log('onRegionChange', this.form.get('region')?.value);
    const region = this.form.get('region')?.value;

    if (region) {
      this.comunas = this.getComunasByRegion(region);
    }
  }

  // TODO: make a common service
  isTheFormValid(form: FormGroup): boolean {
    if (form.valid) {
      return true;
    } else {
      for (const key of Object.keys(form.controls)) {
        if (form.controls[key].invalid) {
          const invalidControl = this.elementRef.nativeElement.querySelector(
            '[formcontrolname="' + key + '"] input'
          );
          invalidControl.focus();
          form.controls[key].markAsTouched();
          break;
        }
      }
      return false;
    }
  }

  // TODO:  manejo de errores
  onSubmit(): boolean {
    const deliveryOption = this.cartDelivery.deliveryOption;

    const { region, comuna, streetName, streetNumber, department } =
      this.form.value;

    const values = {
      deliveryOption: deliveryOption,
      regionId: region,
      comunaId: comuna,
      streetName: streetName,
      streetNumber: streetNumber,
      department: department,
    };

    this.cartDeliveryService.set(values);

    if (deliveryOption == '2') {
      const isTheFormValid = this.isTheFormValid(this.form);
      if (!isTheFormValid) {
        return false;
      }
    }

    this.isLoading = true;

    if (this.cartId) {
      console.log('cartId found');
      this.cartDeliveryService
        .updateCart(
          this.cartId,
          deliveryOption,
          region,
          comuna,
          streetName,
          streetNumber,
          department
        )
        .subscribe((response) => {
          this.isLoading = false;
          console.log(response);
          this.router.navigate(['/cart-shopping/billing']);
        });
    } else console.log('cartId not found');

    return true;
  }
}

// TODO llevar este modelo a commons
interface regionesOptions {
  value: string;
  label: string;
  comunas: any[];
}
interface comunasOptions {
  value: string;
  label: string;
}
