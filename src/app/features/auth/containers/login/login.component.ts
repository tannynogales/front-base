import { RememberMeService } from './../../../../core/services/remember-me.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { User } from '@core/models';
import { ToastService } from '@shared/components/toast/toast.service';
import { first } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;

  formLogin: FormGroup = new FormGroup({});
  rememberMe = false;

  constructor(
    public authService: AuthService,
    public userService: UserService,
    public toastService: ToastService,
    public router: Router,
    public route: ActivatedRoute,
    public readonly title: Title,
    public rememberMeService: RememberMeService
  ) {
    this.title.setTitle(`Login | Curriculum`);
    this.rememberMe = this.rememberMeService.rememberMe;
    // console.log("this.rememberMe", this.rememberMe);
  }

  queryParamFrom!: string;

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [Validators.required]),
      rememberMe: new FormControl<boolean>(this.rememberMe, [
        Validators.required,
      ]),
    });

    this.route.queryParams.subscribe((params) => {
      this.queryParamFrom = params['from'];
      // console.log("this.queryParamFrom", this.queryParamFrom);
    });

    // let routeParams = this.route.snapshot.paramMap;
    // categoryFromRoute = this.routeParams.get('categoryId');
    // console.log("routeParams", routeParams);
  }

  sendLogin(): void {
    // console.log("this.queryParamFrom", this.queryParamFrom);

    this.isLoading = true;

    const { email, password } = this.formLogin.value;
    this.authService.logIn(email, password).subscribe({
      next: (user: User) => {
        this.isLoading = false;

        this.userService.setUser(user);

        this.router.navigateByUrl(this.queryParamFrom || '/').then(() => {
          this.toastService.addToast({ message: 'Login Correcto' });
        });
      },

      error: () => {
        this.isLoading = false;
      },
    });
  }

  changeRememberMe(): void {
    this.rememberMeService.rememberMe = this.formLogin.value.rememberMe;
  }
}
