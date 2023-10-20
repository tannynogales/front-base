import { Component, ElementRef, OnInit } from '@angular/core';
import {
  CartProductsService,
  CartUserService,
  UserService,
} from '@core/services';
import { CartUserObject, Response, ShoppingCartItem } from '@core/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private cartUserService: CartUserService,
    private userService: UserService,
    private elementRef: ElementRef,
    private router: Router,
    private cartProductsService: CartProductsService
  ) {
    // TODO: unsubscribe
    this.cartUserService.cartUser$.subscribe((user) => {
      this.cartUser.cartId = user.cartId;
      this.cartUser.name = user.name;
      this.cartUser.email = user.email;
      this.cartUser.cellphone = user.cellphone;
    });
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl<string>(this.cartUser.name, [Validators.required]),
      email: new FormControl<string>(this.cartUser.email, [
        Validators.required,
        Validators.email,
      ]),
      cellphone: new FormControl<string>(this.cartUser.cellphone, [
        Validators.required,
      ]),
    });
  }

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

  onSubmit(): boolean {
    this.isLoading = true;
    const { email, name, cellphone } = this.form.value;

    const isTheFormValid = this.isTheFormValid(this.form);

    if (!isTheFormValid) return false;

    // this.setCartUser(email, name, cellphone);
    const cartId = this.cartUser?.cartId;

    const user = this.userService.getUser();

    this.cartUserService.set({ cartId, email, name, cellphone });
    if (user?.id)
      if (cartId) {
        this.cartUserService
          .updateCart(cartId, user.id, name, email, cellphone)
          .subscribe((response) => {
            const cartId = response?.data?.id;
            console.log('update', cartId);
            this.goToNextStep(cartId);
          });
        return true;
      } else {
        this.cartUserService
          .createCart(user.id, name, email, cellphone)
          .subscribe((response) => {
            const cartId = response?.data?.id;
            this.cartUserService.set({
              cartId: cartId,
              name: name,
              email: email,
              cellphone: cellphone,
            });
            console.log('create', cartId);
            this.goToNextStep(cartId);
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
  goToNextStep(cartId: number) {
    // console.log('goToNextStep', cartId);
    const { products } = this.cartProductsService.getFromLocalStorage();
    // console.log(products);

    const newProducts = products.filter((product) => {
      // console.log(product?.id, Number.isInteger(product?.id));
      return !Number.isInteger(product?.id);
    });
    // console.log(newProducts);

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
            this.isLoading = false;
            this.router.navigate(['/cart-shopping/delivery']);
          }
        });
    });
  }
}
