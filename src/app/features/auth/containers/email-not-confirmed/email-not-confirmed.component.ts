import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from '@core/services';
import { ToastService } from '@shared/components/toast/toast.service';

@Component({
  selector: 'app-email-not-confirmed',
  templateUrl: './email-not-confirmed.component.html',
  styleUrls: ['./email-not-confirmed.component.scss'],
})
export class EmailNotConfirmedComponent implements OnInit {
  email!: string;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private toastService: ToastService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      // TODO debería pasar el email por un base64 para que no sea visible en la url
      const email = params.get('email');
      if (email !== null) {
        this.email = email;
      }
    });
  }
  sendEmail(): void {
    this.isLoading = true;

    console.log('this.queryParamEmail', this.email);

    this.authService.sendEmailConfirmation(this.email).subscribe({
      next: (response: any) => {
        console.log('response', response);
        this.isLoading = false;

        if (response?.sent) {
          this.toastService.addToast({
            message: 'Se reenvió el correo para confirmar tu cuenta',
          });
        } else {
          this.toastService.addToast({
            message: 'No se envió el correo de confirmación',
          });
        }

        // this.router.navigateByUrl(this.queryParamFrom || '/').then(() => {
        //   this.toastService.addToast({ message: 'Login Correcto' });
        // });
      },

      error: (response) => {
        this.isLoading = false;
        const message = response?.error?.error?.message;
        // Posibles mensajes
        // email is a required field
        // Already confirmed
        console.log('Message error', response);
        this.toastService.addToast({
          message: message,
        });
      },
    });
  }
}
