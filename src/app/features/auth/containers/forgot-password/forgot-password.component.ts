import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/services';
import { ToastService } from '@shared/components/toast/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  isLoading = false;
  success = false;

  formLogin: FormGroup = new FormGroup({});
  rememberMe = false;

  constructor(
    public authService: AuthService,
    public toastService: ToastService,
    public router: Router,
    public route: ActivatedRoute,
    public readonly title: Title
  ) {
    this.title.setTitle(`Login | Recuperar contraseña`);
  }

  queryParamFrom!: string;

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
    });

    this.route.queryParams.subscribe((params) => {
      this.queryParamFrom = params['from'];
    });
  }

  send(): void {
    this.isLoading = true;

    const { email, password } = this.formLogin.value;
    this.authService.forgotPassword(email).subscribe({
      next: (response: any) => {
        console.log('resp', response);
        this.isLoading = false;
        if (response.ok) this.success = true;

        // this.router.navigateByUrl(this.queryParamFrom || '/').then(() => {
        //   this.toastService.addToast({ message: 'Mensaje enviado' });
        // });
      },

      error: (response: any) => {
        this.isLoading = false;
        console.log('error', response);
      },
    });
  }
}
