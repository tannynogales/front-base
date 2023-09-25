import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class RememberMeService {
  set rememberMe(value: boolean) {
    if (value) this.cookieService.set('rememberMe', '1', { path: '/' });
    else this.cookieService.set('rememberMe', '0', { path: '/' });
  }

  get rememberMe(): boolean {
    let rememberMe = this.cookieService.get('rememberMe');
    if (rememberMe == '1') {
      return true;
    } else return false;
  }

  constructor(public cookieService: CookieService) {}
}
