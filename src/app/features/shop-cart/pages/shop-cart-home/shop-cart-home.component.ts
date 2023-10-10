import { Component, ElementRef, OnInit } from '@angular/core';
import { CartUserService } from '@core/services';
import { CartUserObject } from '@core/models';
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
    private elementRef: ElementRef,
    private router: Router
  ) {
    // TODO: unsubscribe
    this.cartUserService.cartUser$.subscribe((user) => {
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

  setCartUser(email: string, name: string, cellphone: string) {
    //TODO: implement ngModel, like i did in cart-delivery
    this.cartUserService.set({
      email: email,
      name: name,
      cellphone: cellphone,
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

  onSubmit() {
    // this.isLoading = true;
    const { email, name, cellphone } = this.form.value;
    this.setCartUser(email, name, cellphone);

    const isTheFormValid = this.isTheFormValid(this.form);

    if (isTheFormValid) {
      this.router.navigate(
        ['/cart-shopping/delivery']
        // , {
        //   queryParams: { from: state.url },
        // }
      );
    }

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
}
