import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';

// import { SessionGuard } from '@core/guards';
import { PrivatePagesService } from '@core/services/private-pages.service';
import { UserService } from '@core/services/user.service';
import { RememberMeService } from '@core/services/remember-me.service';
import { User } from '@core/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-token-expiration',
  templateUrl: './token-expiration.component.html',
  styleUrls: ['./token-expiration.component.scss'],
})
export class TokenExpirationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('tokenExpiration', { static: true })
  public modalElement!: ElementRef<HTMLElement>;
  modalObject: any = null;

  // data$: Observable<String[]>;

  user!: User;
  timer!: any;
  timeToExpire!: number;
  minutesToExpire!: number;
  secondsToExpire!: number;
  privatePages: String[] = [];

  constructor(
    public userService: UserService,
    // public sessionGuard: SessionGuard,
    private privatePagesService: PrivatePagesService,
    private router: Router
  ) {
    this.timer = setInterval(() => {
      if (this.isAboutToExpire()) {
        this.openModal();
      } else {
        this.hideModal();
      }

      if (
        !this.userService.checkUser() &&
        this.privatePagesService.isThisPagePrivate
      ) {
        // TODO: aqui debería clearInterval this.timer, para no estar revisando a cada momento, pero tambien debería volver a activar el timer de nuevo cuando llegue a una ruta privada
        this.logOut();
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    // TODO:
    // if (this.timer) {
    //   clearInterval(this.timer);
    // }
  }

  isAboutToExpire(): boolean {
    let checkUser = this.userService.checkUser();

    if (!checkUser)
      // If user is not logged in, then is NOT about to expire
      return false;

    let user = this.userService.getUser();
    let expires = user.expires;

    if (!expires)
      // If RememberMe is checked, then is NOT about to expire
      return false;

    let today = new Date();
    let todayTime = today.getTime();

    this.timeToExpire = (expires.getTime() - todayTime) / 1000;

    this.minutesToExpire = Math.trunc((this.timeToExpire / 60) % 60);

    this.secondsToExpire = Math.trunc(
      (this.timeToExpire / 60 - this.minutesToExpire) * 60
    );

    if (this.minutesToExpire < 1.2) return true;
    else return false;
  }

  ngAfterViewInit(): void {
    this.modalObject = new bootstrap.Modal(this.modalElement.nativeElement, {
      keyboard: false,
    });
  }

  openModal() {
    if (this.modalObject) this.modalObject.show();
  }

  hideModal() {
    if (this.modalObject) this.modalObject.hide();
  }

  logOut() {
    this.userService.deleteUser();
    location.reload();
  }

  keepLoggedIn() {
    this.userService.keepLoggedIn();
    this.hideModal();
  }
}
