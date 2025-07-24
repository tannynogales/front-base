import { UserService } from '@core/services/user.service';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CartBillingObject, Comuna, Region } from '@core/models';
import {
  CartBillingService,
  CartProductsService,
  CartUserService,
  UtilitiesChileRegionesService,
} from '@core/services';
import { ShoppingCart, ShoppingCartsObject } from '@layout/layout-admin/models';
import { ShoppingCartsService } from '@layout/layout-admin/services';
import { Observable } from 'rxjs';
import { ToastService } from '@shared/components/toast/toast.service';
import { Router } from '@angular/router';

interface RadioItems {
  id: number;
  title: string;
  description?: string;
}

@Component({
  selector: 'app-shop-cart-billing',
  templateUrl: './shop-cart-billing.component.html',
  styleUrls: ['./shop-cart-billing.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopCartBillingComponent implements OnInit {
  comunas!: comunasOptions[];
  regiones!: regionesOptions[];

  cartId = this.cartUserService.getFromLocalStorage()?.cartId;

  shoppingCarts$: Observable<ShoppingCartsObject>;

  cartBilling!: CartBillingObject;

  billingDataOption: 0 | 1 | 2 = 0;
  isLoading = false;
  // regiones$: Observable<RegionesObject>;

  breadcrumbItems = [
    {
      title: 'Carrito de Compras',
      url: '/cart-shopping',
    },
  ];
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

  activeStep = 2;

  billingRadioItems: RadioItems[] = [
    {
      id: 35,
      title: 'Boleta',
      // description: 'Boleta description.',
    },
    {
      id: 30,
      title: 'Factura',
      // description: 'Factura description.',
    },
  ];

  formGroup: FormGroup = new FormGroup({});

  elementRef = inject(ElementRef);

  constructor(
    private cartBillingService: CartBillingService,
    private utilitiesChileRegionesService: UtilitiesChileRegionesService,
    private shoppingCartsService: ShoppingCartsService,
    private userService: UserService,
    private cartUserService: CartUserService,
    private cartProductsService: CartProductsService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.shoppingCarts$ = this.shoppingCartsService.shoppingCarts$;

    // this.regiones$ = this.utilitiesChileRegionesService.regiones$;

    this.cartBillingService.cartBilling$.subscribe((data) => {
      this.cartBilling = data;
      console.log('cartBilling', data);
    });

    this.utilitiesChileRegionesService.regiones$.subscribe((regiones) => {
      this.regiones = this.regionToOptions(regiones.data);
      this.comunas = this.getComunasByRegion(this.cartBilling.billing_region);
    });
  }

  ngOnInit(): void {
    //TODO: I should call this service in the layout. In this point, I will call the service every time that I visit the page.
    this.utilitiesChileRegionesService.fetch();
    this.shoppingCartsService.fetch(1, 2, 2, this.userService.getUser()?.id);

    this.formGroup = new FormGroup({
      billing_rut: new FormControl<string>('', [Validators.required]),
      billing_name: new FormControl<string>('', [Validators.required]),
      billing_giro: new FormControl<string>('', [Validators.required]),
      billing_direccion: new FormControl<string>('', [Validators.required]),
      billing_region: new FormControl<string>(
        this.cartBilling.billing_region || '',
        [Validators.required]
      ),
      billing_comuna: new FormControl<string>(this.cartBilling.billing_comuna, [
        Validators.required,
      ]),
    });
  }

  getComunasByRegion(regionId?: string): comunasOptions[] {
    const regiones = this.regiones;

    const region = regiones.find((element) => element.value == regionId);

    const comunas = region?.comunas;

    if (comunas) {
      this.cartBilling.billing_comuna = comunas[0].id;
      return this.comunaToOptions(comunas);
    } else return [];
  }

  // TODO:  manejo de errores
  onSubmit(): boolean {
    if (!this.cartBilling.billing_type) {
      this.toastService.addToast({
        message: 'Para continuar, selecciona boleta o factura.',
      });
      return false;
    }

    const cartState = this.cartUserService.getFromLocalStorage()?.cartState;
    let state = 3;
    if (cartState) if (cartState > 3) state = cartState;

    let dataValues = null;

    console.log('cartBilling.billing_type', this.cartBilling.billing_type);
    console.log('cathis.billingDataOption', this.billingDataOption);

    if (this.cartBilling.billing_type == 30) {
      if (this.billingDataOption == 0) dataValues = this.validBillingData;
      else dataValues = this.formGroup.value;
    }
    // if(this.cartBilling.billing_type == 35){}
    this.cartBillingService.set({
      ...dataValues,
      billing_type: this.cartBilling.billing_type,
    });

    if (this.cartBilling.billing_type == 30 && this.billingDataOption == 2) {
      const isTheFormValid = this.isTheFormValid(this.formGroup);
      if (!isTheFormValid) return false;
    }

    this.isLoading = true;

    if (!this.cartId) {
      this.toastService.addToast({
        message: 'No se encontró un carrito.',
      });
      return false;
    }

    const cartProducts =
      this.cartProductsService.getFromLocalStorage().products;

    if (cartProducts.length <= 0) {
      this.isLoading = false;
      this.toastService.addToast({
        message: 'Para continuar, agrega productos a tu carrito.',
      });
      return false;
    }

    this.cartBillingService.set(this.cartBilling);

    this.cartBillingService
      .updateBilling(this.cartId, this.cartBilling, state)
      .subscribe((response) => {
        this.isLoading = false;
        // this.cartUserService.unSet();
        // this.cartProductsService.unSet();
        this.router.navigate(['/cart-shopping/payment']);
      });

    return true;
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

  validBillingData!: ShoppingCart;
  validateBillingData(data: ShoppingCart): boolean {
    if (
      !data.billing_rut ||
      !data.billing_direccion ||
      !data.billing_comuna ||
      !data.billing_giro
    )
      return false;

    this.validBillingData = data;
    return true;
  }

  // TO DO llevar a comnons
  regionToOptions(regiones: Region[]): regionesOptions[] {
    // console.log('regionToOptions');
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

  onRegionChange() {
    console.log('onRegionChange', this.formGroup.get('billing_region')?.value);
    const region = this.formGroup.get('billing_region')?.value;

    if (region) {
      this.comunas = this.getComunasByRegion(region);
    }
  }
  comunaToOptions(comunas: Comuna[]): comunasOptions[] {
    // console.log('comunaToOptions');
    const options = comunas.map((comuna) => {
      return {
        value: comuna.id,
        label: comuna.name,
      };
    });
    return options;
  }
}

// TO DO  llevar a un modelo comun (ya está repetido en delivery-component)
interface regionesOptions {
  value: string;
  label: string;
  comunas: any[];
}
interface comunasOptions {
  value: string;
  label: string;
}
