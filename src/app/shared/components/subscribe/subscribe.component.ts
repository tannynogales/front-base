import { SubscribeService } from './../../../core/services/subscribe.service';
import { Component } from '@angular/core';
import { ToastService } from '@shared/components/toast/toast.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent {
  email: string = '';
  isLoading = false;

  constructor(
    private toastService: ToastService,
    private subscribeService: SubscribeService
  ) {}
  suscribe(): boolean {
    this.isLoading = true;

    console.log(this.email);
    if (this.email == '') {
      this.toastService.addToast({ message: 'El email no puede ser vacío' });
      this.isLoading = false;
      return false;
    }

    this.subscribeService.create(this.email).subscribe({
      next: (responce: any) => {
        console.log('responce', responce);
        this.isLoading = false;

        this.toastService.addToast({ message: 'Te has suscrito!' });
      },

      error: (response) => {
        this.isLoading = false;
        console.log('Message error', response);

        const message = response?.error?.error?.message;

        if (message == 'This attribute must be unique') {
          this.toastService.addToast({ message: 'Ya estás suscrito!' });
        } else {
          this.toastService.addToast({
            message: 'No se ha podido enviar tu suscripicón',
          });
        }
      },
    });

    return true;
  }
}
