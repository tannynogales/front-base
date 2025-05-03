import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, UserService } from '@core/services';
import { ToastService } from '@shared/components/toast/toast.service';
import { passwordMatchingValidatior } from '../sign-up/validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  isLoading = false;

  formGroup: FormGroup = new FormGroup({});
  rememberMe = false;

  constructor(
    public authService: AuthService,
    public toastService: ToastService,
    public router: Router,
    public route: ActivatedRoute,
    public readonly title: Title,
    private userService: UserService
  ) {
    this.title.setTitle(`Login | Recuperar contraseña`);
  }

  queryParamFrom!: string;
  code!: string;

  ngOnInit(): void {
    this.formGroup = new FormGroup(
      {
        password: new FormControl<string>('', [Validators.required]),
        passwordRepeat: new FormControl<string>('', [Validators.required]),
      },
      {
        validators: [passwordMatchingValidatior],
        updateOn: 'change',
      }
    );

    this.route.queryParams.subscribe((params) => {
      this.queryParamFrom = params['from'];
      this.code = params['code'];
    });
  }

  send(): void {
    this.isLoading = true;

    const { password, passwordRepeat } = this.formGroup.value;
    this.authService
      .resetPassword(this.code, password, passwordRepeat)
      .subscribe({
        next: (response: any) => {
          console.log('user', response);
          this.isLoading = false;

          // this.userService.setUser({
          //   id: response.user.id,
          //   name: response.user.username,
          //   email: response.user.email,
          //   jwt: response.jwt,
          // });

          this.router
            .navigateByUrl(this.queryParamFrom || '/auth/login')
            .then(() => {
              this.toastService.addToast({
                message: 'Contraseña cambiada con éxito',
              });
            });
        },

        error: (response: any) => {
          this.isLoading = false;
          this.toastService.addToast({
            message: `Error: ${response.error.error.message}`,
            state: 'danger',
          });
          console.log('error', response);
        },
      });
  }
}
