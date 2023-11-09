import { Component, ElementRef, OnInit } from '@angular/core';
import {
  CartProductsService,
  CartUserService,
  UserService,
} from '@core/services';
import {
  CartUserObject,
  Response,
  ShoppingCartItem,
  ShoppingCartObject,
} from '@core/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shop-cart-home',
  templateUrl: './shop-cart-home.component.html',
  styleUrls: ['./shop-cart-home.component.scss'],
})
export class ShopCartHomeComponent implements OnInit {
  isLoading = false;
  breadcrumbItems = [
    {
      title: 'Carrito de Compras',
      url: '/home',
    },
  ];

  cartUser: CartUserObject = {
    name: '',
    email: '',
    cellphone: '',
  };

  form: FormGroup = new FormGroup({});

  shoppingCart$: Observable<ShoppingCartObject>;
  constructor(
    private cartUserService: CartUserService,
    private userService: UserService,
    private elementRef: ElementRef,
    private router: Router,
    private cartProductsService: CartProductsService
  ) {
    // TODO: unsubscribe
    this.cartUserService.cartUser$.subscribe((user) => {
      this.setCartUser(user);
    });

    this.shoppingCart$ = this.cartProductsService.shoppingCart$;
  }

  // Is used to set get the userCart, but if the userCart is not set, it will use the user info from the login
  setCartUser(cartUser: CartUserObject) {
    this.cartUser = cartUser;

    let flag = false;
    // const cartUser = this.cartUserService.getFromLocalStorage();
    if (cartUser)
      if (cartUser.email != '' && cartUser.name != '') {
        // if (cartUser?.cartId) this.cartUser.cartId = cartUser.cartId;
        // if (cartUser?.cartState) this.cartUser.cartState = cartUser.cartState;
        // this.cartUser.name = cartUser.name;
        // this.cartUser.email = cartUser.email;
        // this.cartUser.cellphone = cartUser.cellphone;
        flag = true;
      }

    if (!flag) {
      const user = this.userService.getUser();
      this.cartUser.name = user.name;
      this.cartUser.email = user.email;
    }
    console.log('setCartUser', this.cartUser);
  }

  // @ViewChild('miDiv', { static: true }) miDiv!: ElementRef;

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl<string>(this.cartUser.name, [Validators.required]),
      email: new FormControl<string>(this.cartUser.email, [
        Validators.required,
        Validators.email,
      ]),
      cellphone: new FormControl<string>(this.cartUser.cellphone, [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
    });
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
  submittedTimes = 0;
  onSubmit(): boolean {
    console.log('onSubmit', this.submittedTimes);
    if (this.submittedTimes >= 2) {
      console.log('IF onSubmit', this.submittedTimes);
      return false;
    }

    const isTheFormValid = this.isTheFormValid(this.form);

    if (!isTheFormValid) return false;

    this.isLoading = true;
    const { email, name, cellphone } = this.form.value;

    // this.setCartUser(email, name, cellphone);
    const cartId = this.cartUser?.cartId;
    const cartState = this.cartUser?.cartState;

    const user = this.userService.getUser();

    this.cartUserService.set({ cartId, email, name, cellphone });
    if (user?.id)
      if (cartId) {
        let state = 1;
        if (cartState) if (cartState >= 1) state = cartState;

        this.cartUserService
          .updateCart(cartId, user.id, name, email, cellphone, state)
          .subscribe({
            next: (response) => {
              const cartId = response?.data?.id;
              console.log('update', cartId);
              this.createProducts(cartId);
            },
            // complete: () => {
            //   console.log('complete');
            // },
            error: (response) => {
              this.isLoading = false;
              const status = response.status;
              console.log('update error', typeof response.status);
              if (response.status == status) {
                console.log('error 400 if');
                this.submittedTimes++;
                this.cartUserService.unSet();
                this.onSubmit();
              }
            },
          });
        return true;
      } else {
        this.cartUserService
          .createCart(user.id, name, email, cellphone)
          .subscribe({
            next: (response) => {
              const cartId = response?.data?.id;
              this.cartUserService.set({
                cartId: cartId,
                cartState: 1,
                name: name,
                email: email,
                cellphone: cellphone,
              });
              console.log('create', cartId);
              this.createProducts(cartId);
            },
            complete: () => {
              this.isLoading = false;
              console.log('complete');
            },
            error: (response) => {
              console.log('create error', response);
            },
          });
        return true;
      }
    else return false;

    // console.log(email, name, cellphone);
    // this.authService.logIn(email, password).subscribe({
    //   next: (user: User) => {
    //     this.isLoading = false;

    //     this.userService.setUser(user);

    //     this.router.navigateByUrl(this.queryParamFrom || '/').then(() => {
    //       this.toastService.addToast({ message: 'Login Correcto' });
    //     });
    //   },

    //   error: () => {
    //     this.isLoading = false;
    //   },
    // });
  }

  newProductsCreated: number = 0;
  createProducts(cartId: number) {
    // console.log('goToNextStep', cartId);
    const { products } = this.cartProductsService.getFromLocalStorage();
    // console.log(products);

    const newProducts = products.filter((product) => {
      // console.log(product?.id, Number.isInteger(product?.id));
      return !Number.isInteger(product?.id);
    });
    // console.log(newProducts);
    if (newProducts.length > 0) {
      newProducts.forEach((product) => {
        // console.log(product);

        this.cartProductsService
          .createProductDB(
            product.price,
            product.productId,
            cartId,
            product.quantity
          )
          .subscribe((response) => {
            // TODO update product id
            const shoppingCartProductId = response?.data?.id;
            // console.log(shoppingCartProductId);
            if (product.productId && shoppingCartProductId) {
              // console.log('if', product.productId, shoppingCartProductId);
              this.cartProductsService.setShoppingCartProductId(
                product.productId,
                shoppingCartProductId
              );
            }
            // else console.log('else', product?.id, shoppingCartProductId);
            this.newProductsCreated++;

            if (this.newProductsCreated === newProducts.length) {
              this.goToNextStep();
            }
          });
      });
    } else {
      console.log('else, no products to create');
      this.goToNextStep();
    }
  }

  goToNextStep() {
    this.isLoading = false;
    this.router.navigate(['/cart-shopping/delivery']);
  }
}
